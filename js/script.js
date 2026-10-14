// HTML elements
const value = document.querySelector("#value");
const input = document.querySelector("#smoothness");

const fileSelector = document.getElementById("source");
const fileLabel = document.getElementById("fileName");
const output = document.getElementById("result");
const statusLine = document.getElementById("status");

const editor = document.getElementById("editor");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const placeholder = document.getElementById("placeholder");
const selectionCount = document.getElementById("selectionCount");
const toolButtons = document.querySelectorAll(".tool[data-tool]");
const actionButtons = document.querySelectorAll("aside button");

const preview = document.getElementById("preview");
const previewPlaceholder = document.getElementById("previewPlaceholder");
const exportButtons = document.querySelectorAll("#copyButton, #downloadButton, #svgButton");

// Variables
var originalURL = "";
var originalImage = null;
var fileName = "";
var resultSVG = "";

// Areas to keep exactly as in the original image, in image pixel coordinates:
// {type: "rect", x, y, w, h} or {type: "lasso", points: [[x, y], ...]}
var selections = [];
var currentTool = "rect";
var drawing = null;

var pyodideReady = null;


// Initial setup
canvas.style.display = "none";
value.textContent = input.value;


// Listeners
input.addEventListener("input", (event) => {
	value.textContent = event.target.value;
});

output.addEventListener("click", function (event) {
	this.select();
});

fileSelector.addEventListener("change", (event) => {
	const fileList = event.target.files;
	readFile(fileList[0]);
	fileSelector.value = "";
});

editor.addEventListener("dragover", (event) => {
	event.preventDefault();
	editor.classList.add("dragging");
});

editor.addEventListener("dragleave", () => {
	editor.classList.remove("dragging");
});

editor.addEventListener("drop", (event) => {
	event.preventDefault();
	editor.classList.remove("dragging");
	readFile(event.dataTransfer.files[0]);
});

toolButtons.forEach((button) => {
	button.addEventListener("click", () => {
		currentTool = button.dataset.tool;
		toolButtons.forEach((b) => b.classList.toggle("active", b === button));
	});
});

document.getElementById("undoButton").addEventListener("click", () => {
	selections.pop();
	selectionsChanged();
});

document.getElementById("clearButton").addEventListener("click", () => {
	selections = [];
	selectionsChanged();
});

canvas.addEventListener("pointerdown", (event) => {
	if (!originalImage || event.button !== 0) return;
	canvas.setPointerCapture(event.pointerId);
	const [x, y] = toImageCoords(event);
	if (currentTool === "rect") {
		drawing = { type: "rect", x0: x, y0: y, x: x, y: y, w: 0, h: 0 };
	} else {
		drawing = { type: "lasso", points: [[x, y]] };
	}
	redraw();
});

canvas.addEventListener("pointermove", (event) => {
	if (!drawing) return;
	const [x, y] = toImageCoords(event);
	if (drawing.type === "rect") {
		drawing.x = Math.min(drawing.x0, x);
		drawing.y = Math.min(drawing.y0, y);
		drawing.w = Math.abs(x - drawing.x0);
		drawing.h = Math.abs(y - drawing.y0);
	} else {
		drawing.points.push([x, y]);
	}
	redraw();
});

canvas.addEventListener("pointerup", () => {
	if (!drawing) return;
	const box = bounds(drawing);
	if (box.w >= 3 && box.h >= 3) {
		if (drawing.type === "rect") {
			selections.push({ type: "rect", x: drawing.x, y: drawing.y, w: drawing.w, h: drawing.h });
		} else if (drawing.points.length >= 3 && polygonArea(drawing.points) >= 9) {
			selections.push(drawing);
		}
	}
	drawing = null;
	selectionsChanged();
});

canvas.addEventListener("pointercancel", () => {
	drawing = null;
	redraw();
});

window.addEventListener("resize", fitCanvas);


// Functions
function setStatus(message, busy = false) {
	statusLine.textContent = message;
	statusLine.classList.toggle("busy", busy);
}

async function copyToClipboard() {
	if (!output.value) return;
	try {
		await navigator.clipboard.writeText(output.value);
	} catch (error) {
		output.select();
		document.execCommand("copy");
	}
	setStatus("Copied! Paste it into excalidraw.com with Ctrl/Cmd+V.");
}

function saveFile(content, type, extension) {
	const blob = new Blob([content], { type: type });
	const link = document.createElement("a");
	link.href = URL.createObjectURL(blob);
	link.download = (fileName.replace(/\.[^.]+$/, "") || "drawing") + extension;
	link.click();
	setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

function downloadScene() {
	if (output.value) saveFile(output.value, "application/json", ".excalidraw");
}

function downloadSVG() {
	if (resultSVG) saveFile(resultSVG, "image/svg+xml", ".svg");
}

function showResult(scene) {
	output.value = scene ? JSON.stringify(scene, null, 4) : "";
	resultSVG = scene ? sceneToSVG(scene) : "";

	if (preview.src) URL.revokeObjectURL(preview.src);
	if (resultSVG) {
		preview.src = URL.createObjectURL(new Blob([resultSVG], { type: "image/svg+xml" }));
		preview.style.display = "block";
	} else {
		preview.removeAttribute("src");
		preview.style.display = "none";
	}
	previewPlaceholder.style.display = resultSVG ? "none" : "block";
	exportButtons.forEach((b) => (b.disabled = !scene));
}

// Same drawing as the Excalidraw scene: one filled path per shape, then the kept areas on top
function sceneToSVG(scene) {
	const W = originalImage.naturalWidth;
	const H = originalImage.naturalHeight;
	const round = (n) => Math.round(n * 100) / 100;
	const parts = [];

	for (const el of scene.elements) {
		if (el.type === "image") {
			const file = scene.files[el.fileId];
			parts.push(`<image href="${file.dataURL}" x="${el.x}" y="${el.y}" width="${el.width}" height="${el.height}"/>`);
		} else if (el.points && el.points.length > 2 && el.opacity > 0) {
			const d = el.points
				.map(([px, py], i) => (i === 0 ? "M" : "L") + round(el.x + px) + " " + round(el.y + py))
				.join("") + "Z";
			parts.push(`<path d="${d}" fill="${el.backgroundColor}"/>`);
		}
	}

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">\n` +
		parts.join("\n") + "\n</svg>\n";
}

function readFile(file) {
	if (!file) return;
	if (file.type && file.type !== "image/png" && file.type !== "image/jpeg") {
		alert("File is not a PNG or JPG image.");
		return;
	}

	const reader = new FileReader();
	reader.readAsDataURL(file);

	reader.onload = function () {
		const img = new Image();
		img.onload = function () {
			originalImage = img;
			originalURL = reader.result;
			fileName = file.name;
			selections = [];

			fileLabel.textContent = file.name;
			placeholder.style.display = "none";
			showResult(null);
			setStatus("");

			canvas.width = img.naturalWidth;
			canvas.height = img.naturalHeight;
			canvas.style.display = "block";
			fitCanvas();
			selectionsChanged();
		};
		img.onerror = () => alert("Could not read this image.");
		img.src = reader.result;
	};
}


// Selection editor
function fitCanvas() {
	if (!originalImage) return;
	const maxWidth = editor.clientWidth - 24;
	const maxHeight = Math.max(window.innerHeight * 0.6, 240);
	const scale = Math.min(maxWidth / canvas.width, maxHeight / canvas.height, 4);
	canvas.style.width = Math.floor(canvas.width * scale) + "px";
	canvas.style.height = Math.floor(canvas.height * scale) + "px";
	redraw();
}

function toImageCoords(event) {
	const rect = canvas.getBoundingClientRect();
	const x = (event.clientX - rect.left) * canvas.width / rect.width;
	const y = (event.clientY - rect.top) * canvas.height / rect.height;
	return [
		Math.min(Math.max(x, 0), canvas.width),
		Math.min(Math.max(y, 0), canvas.height),
	];
}

function bounds(sel) {
	if (sel.type === "rect") {
		return { x: sel.x, y: sel.y, w: sel.w, h: sel.h };
	}
	const xs = sel.points.map((p) => p[0]);
	const ys = sel.points.map((p) => p[1]);
	const x = Math.min(...xs);
	const y = Math.min(...ys);
	return { x: x, y: y, w: Math.max(...xs) - x, h: Math.max(...ys) - y };
}

function polygonArea(points) {
	let area = 0;
	points.forEach(([x1, y1], i) => {
		const [x2, y2] = points[(i + 1) % points.length];
		area += x1 * y2 - x2 * y1;
	});
	return Math.abs(area) / 2;
}

// Adds the outline of a selection to the context, shifted by (dx, dy)
function selectionPath(context, sel, dx = 0, dy = 0) {
	context.beginPath();
	if (sel.type === "rect") {
		context.rect(sel.x - dx, sel.y - dy, sel.w, sel.h);
	} else {
		sel.points.forEach(([x, y], i) => {
			if (i === 0) context.moveTo(x - dx, y - dy);
			else context.lineTo(x - dx, y - dy);
		});
		context.closePath();
	}
}

function selectionsChanged() {
	const n = selections.length;
	selectionCount.textContent = n === 0 ? "No areas kept" : n === 1 ? "1 area kept" : n + " areas kept";
	redraw();
}

function redraw() {
	if (!originalImage) return;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(originalImage, 0, 0);

	const shapes = drawing ? selections.concat([drawing]) : selections;
	if (shapes.length === 0) return;

	// Fade what will be vectorized so the kept areas stand out
	ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for (const sel of shapes) {
		ctx.save();
		selectionPath(ctx, sel);
		ctx.clip();
		ctx.drawImage(originalImage, 0, 0);
		ctx.restore();
	}

	// Keep the outline about 2 screen pixels wide whatever the zoom
	const px = canvas.width / (canvas.getBoundingClientRect().width || canvas.width);
	ctx.lineWidth = 2 * px;
	ctx.setLineDash([6 * px, 4 * px]);
	ctx.strokeStyle = "#7d27c3";
	for (const sel of shapes) {
		selectionPath(ctx, sel);
		ctx.stroke();
	}
	ctx.setLineDash([]);
}

// The image sent to the vectorizer: the kept areas are painted white, so they
// are neither traced nor counted when reducing the colors
function tracingInputURL() {
	if (selections.length === 0) return originalURL;
	const c = document.createElement("canvas");
	c.width = originalImage.naturalWidth;
	c.height = originalImage.naturalHeight;
	const g = c.getContext("2d");
	g.drawImage(originalImage, 0, 0);
	g.fillStyle = "#ffffff";
	for (const sel of selections) {
		selectionPath(g, sel);
		g.fill();
	}
	return c.toDataURL("image/png");
}

function randomHex(length) {
	const bytes = crypto.getRandomValues(new Uint8Array(Math.ceil(length / 2)));
	return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("").slice(0, length);
}

function randomInt() {
	return crypto.getRandomValues(new Uint32Array(1))[0] >>> 1;
}

// One Excalidraw image element per kept area, cut from the original pixels.
// Scene coordinates match image pixels, so each piece lands where it was.
function keptImages() {
	const elements = [];
	const files = {};
	const W = originalImage.naturalWidth;
	const H = originalImage.naturalHeight;

	for (const sel of selections) {
		// 1px margin so the piece also covers the antialiased edge of the white hole
		const b = bounds(sel);
		const x = Math.max(0, Math.floor(b.x) - 1);
		const y = Math.max(0, Math.floor(b.y) - 1);
		const w = Math.min(W, Math.ceil(b.x + b.w) + 1) - x;
		const h = Math.min(H, Math.ceil(b.y + b.h) + 1) - y;

		const c = document.createElement("canvas");
		c.width = w;
		c.height = h;
		const g = c.getContext("2d");
		if (sel.type === "lasso") {
			// Paint the lasso (grown by 1px) as a mask, then keep the image only inside it
			selectionPath(g, sel, x, y);
			g.fill();
			g.lineWidth = 2;
			g.stroke();
			g.globalCompositeOperation = "source-in";
		}
		g.drawImage(originalImage, -x, -y);

		const now = Date.now();
		const fileId = randomHex(40);
		files[fileId] = {
			mimeType: "image/png",
			id: fileId,
			dataURL: c.toDataURL("image/png"),
			created: now,
			lastRetrieved: now,
		};
		elements.push({
			type: "image",
			id: randomHex(20),
			x: x,
			y: y,
			width: w,
			height: h,
			angle: 0,
			strokeColor: "transparent",
			backgroundColor: "transparent",
			fillStyle: "solid",
			strokeWidth: 1,
			strokeStyle: "solid",
			roughness: 0,
			opacity: 100,
			groupIds: [],
			seed: randomInt(),
			version: 1,
			versionNonce: randomInt(),
			isDeleted: false,
			boundElements: null,
			updated: now,
			link: null,
			locked: false,
			status: "saved",
			fileId: fileId,
			scale: [1, 1],
		});
	}
	return { elements: elements, files: files };
}


// Pipeline
function getPyodide(packages) {
	if (!pyodideReady) pyodideReady = loadPyodide();
	return pyodideReady.then(async (pyodide) => {
		await pyodide.loadPackage(packages);
		return pyodide;
	});
}

async function runTask(message, task) {
	if (!originalImage) {
		alert("Select an image first.");
		return;
	}
	actionButtons.forEach((b) => (b.disabled = true));
	exportButtons.forEach((b) => (b.disabled = true));
	setStatus(message, true);
	try {
		// Snapshot the kept areas now, so edits made while it runs do not mix in
		await task(tracingInputURL(), keptImages());
	} catch (error) {
		console.error(error);
		showResult(null);
		setStatus("Something went wrong: " + error.message);
	} finally {
		actionButtons.forEach((b) => (b.disabled = false));
	}
}

function run_pipeline() {
	runTask("Converting... (the first run loads Python in the browser)", convertImage);
}

function stylize() {
	runTask("Reducing colors... (the first run downloads OpenCV, this can take a while)", async (url, kept) => {
		const reduced = await reduceColors(url);
		setStatus("Converting...", true);
		await convertImage(reduced, kept);
	});
}

const REDUCE_COLORS_SCRIPT = `
				import numpy as np
				import cv2
				import json
				import base64


				def __choose_colors__(img, comp_shape, thresh=.01, apply_dist=False):
					# Reduce the image to a compressed shape to find the optimal color division
					# while ignoring small details that can be ignored on the final image
					im = cv2.resize(img,comp_shape, interpolation=cv2.INTER_NEAREST)

					# Convert the reduced image to Z vector and to np.float32
					Z = im.reshape((-1,3))
					Z = np.float32(Z)

					# Setup the K-means clustering parameters
					criteria = (cv2.TERM_CRITERIA_EPS, 10, 1.0)

					# Initialize the loop for approximating the optimal value for K
					cur = cv2.kmeans(Z,1,None,criteria,10,cv2.KMEANS_PP_CENTERS)[0]

					prev = None
					diff = 0
					vals = []

					for K in range(2,21):
						# Compute the metric value for the current K
						prev = cur
						cur = cv2.kmeans(Z,K,None,criteria,10,cv2.KMEANS_PP_CENTERS)[0]

						# If the metric value is 0, optimal number of K has been found
						if cur == 0:
							break

						# Calculate how much better the metric is for the current K
						cur_diff = round(1-cur/prev,1)
						diff = cur_diff
						vals.append(prev-cur)

					# Apply a distortion for a more "hand-drawn" appearance
					if apply_dist:
						img = padder(img)
						img = deformer(img)

					# Convert the distorted to Z vector and to np.float32
					Z = img.reshape((-1,3))
					Z = np.float32(Z)

					# If the optimal K is not found, try to approximate it by the elbow method
					if cur != 0:
						# Normalize the differences and find the cutting point where the metric stops improving
						vals = [v/max(vals) for v in vals]
						K = [v>thresh for v in vals].index(False) +1## list starts at K==2

					# Calculate the color regions in the distorted image using the K-value chosen
					return cv2.kmeans(Z, K, None, criteria, 10, cv2.KMEANS_PP_CENTERS)


				def get_region_masks(img, comp_shape=(64,64), thresh=.01, apply_dist=False):
					# Approximate the optimal color division
					ret,label,center = __choose_colors__(img, comp_shape, thresh, apply_dist)

					img_dims = img.shape[:2]
					if apply_dist:
						img_dims = (img_dims[0]+PAD_SIZE*2, img_dims[1]+PAD_SIZE*2)

					# Now convert back into uint8, and return the mask for each region
					colors = np.uint8(center)
					blank = np.ones(img_dims, dtype=np.uint8)*255
					lbl_mask = label.reshape(img_dims)

					# Iterate over each color id
					for color_id in np.unique(label):
						color = colors[color_id]

						# If the RGB is too high, assume as background
						if all(color > 250):
							continue

						# Create a mask for the regions occupied by the current color
						mask = blank.copy()
						mask[lbl_mask==color_id] = 0

						# Apply a morphological transformation to the mask to remove noise
						d = cv2.dilate(mask, None)
						mask = cv2.erode(d, None)
						mask = cv2.erode(mask, None)

						mask = cv2.bitwise_not(mask)
						yield color, mask



				# Stylizing function
				def stylize(img, comp_shape=(64,64), thresh=.01, apply_dist=False):
					img_dims = img.shape
					if apply_dist:
						img_dims = list(img_dims)
						img_dims[0] += PAD_SIZE*2
						img_dims[1] += PAD_SIZE*2
						img_dims = tuple(img_dims)

					blank = np.zeros(img_dims, dtype=np.uint8)
					full_mask = np.zeros(img_dims[:2], dtype=np.uint8)

					for color, mask in get_region_masks(img, comp_shape, thresh, apply_dist):
						# Draw the colored mask into the canvas
						blank[mask==255] = color

						# Save the original mask shape into a "global mask"
						full_mask = cv2.bitwise_or(full_mask, mask)

					# Use the global mask to decide the transparent region
					final = cv2.cvtColor(blank, cv2.COLOR_BGR2BGRA)
					final[...,3] = full_mask

					return final

				hdr, encoded  = image.split(',')

				bytes_data = base64.b64decode(encoded)
				img = cv2.imdecode(np.frombuffer(bytes_data, dtype=np.uint8), cv2.IMREAD_UNCHANGED)

				if len(img.shape)==3 and img.shape[-1] == 4:
					alpha = cv2.bitwise_not(img[...,3])
					img = img[...,:3]
					img[...,0] = cv2.bitwise_or(img[...,0], alpha)
					img[...,1] = cv2.bitwise_or(img[...,1], alpha)
					img[...,2] = cv2.bitwise_or(img[...,2], alpha)

				out = stylize(img)

				new_bytes_data = cv2.imencode('.png', out)[1]
				new_bytes_data = new_bytes_data.astype(np.int8).tobytes()
				new_bytes_data = base64.b64encode(new_bytes_data)

				url = ','.join(['data:image/png;base64',str(new_bytes_data)[2:-1]])
				url
`;

const SIMPLIFY_SCRIPT = `
				from shapely.geometry import Polygon
				import numpy as np

				import json

				tax = .1*int(smoothness)

				for obj in exc['elements']:
					points = obj['points']
					if len(points) < 3:
						continue
					p = Polygon(points)
					simplified = p.simplify(p.length / (tax*len(points)))
					if simplified.is_empty:
						continue
					xx, yy = simplified.exterior.coords.xy
					new_points = list(zip(xx,yy))
					obj['points'] = new_points

				exc["source"] = "https://www.politecnica.pucrs.br/laboratorios/lis/"
				exc["type"] = "excalidraw"
				exc["version"] = 2

				json.dumps(exc)
`;

async function reduceColors(url) {
	const pyodide = await getPyodide(["opencv-python"]);
	pyodide.globals.set("image", url);
	return pyodide.runPython(REDUCE_COLORS_SCRIPT);
}

// svg-to-excalidraw walks the SVG recursively, one level per <path>, so photos
// (tens of thousands of paths) overflow the stack. Convert the paths in batches.
const PATHS_PER_BATCH = 1000;

function svgToScene(svg) {
	const root = new DOMParser().parseFromString(svg, "image/svg+xml").documentElement;
	if (root.nodeName !== "svg") throw new Error("could not read the traced SVG");
	const paths = Array.from(root.children);

	const elements = [];
	for (let i = 0; i === 0 || i < paths.length; i += PATHS_PER_BATCH) {
		const batch = root.cloneNode(false);
		paths.slice(i, i + PATHS_PER_BATCH).forEach((path) => batch.appendChild(path));
		const { hasErrors, content } = convert(new XMLSerializer().serializeToString(batch));
		if (hasErrors) throw new Error("could not read the traced SVG");
		content.elements.forEach((el) => elements.push(el));
	}

	// Same order convert() gives: biggest shapes (with their groups) first, small details on top
	const groupArea = {};
	elements.forEach((el) => el.groupIds.forEach((id) => {
		groupArea[id] = (groupArea[id] || 0) + el.width * el.height;
	}));
	const weight = (el) => el.width * el.height + el.groupIds.reduce((sum, id) => sum + groupArea[id], 0);
	elements.sort((a, b) => weight(b) - weight(a));

	return {
		type: "excalidraw",
		version: 2,
		source: "https://www.politecnica.pucrs.br/laboratorios/lis/",
		elements: elements,
	};
}

async function convertImage(url, kept) {
	const svg = await new Promise((resolve) => ImageTracer.imageToSVG(url, resolve));
	const content = svgToScene(svg);

	const pyodide = await getPyodide(["shapely"]);
	pyodide.globals.set("exc", pyodide.toPy(content));
	pyodide.globals.set("smoothness", input.value);
	const scene = JSON.parse(pyodide.runPython(SIMPLIFY_SCRIPT));

	// The tracer gives opacity as 0-255, Excalidraw expects 0-100
	scene.elements.forEach((el) => (el.opacity = Math.round(Math.min(el.opacity, 255) / 2.55)));

	const shapes = scene.elements.length;
	scene.elements.push(...kept.elements);
	scene.files = kept.files;
	showResult(scene);

	setStatus(
		"Done: " + shapes + " shapes" +
		(kept.elements.length ? " + " + kept.elements.length + " original area(s)" : "") +
		". Export it from the Result panel."
	);
}
