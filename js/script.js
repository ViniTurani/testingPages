// HTML elements
const value = document.querySelector("#value");
const input = document.querySelector("#smoothness");
const thumb = document.querySelector("#loadedimg");

const fileSelector = document.getElementById("source");
const output = document.getElementById("result");

// Variables
var originalURL = "";
var fileURL = "";
var fileName = "";


// Initial setup
thumb.style.display = "none";
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
});


// Functions
function copyToClipboard() {
	const output = document.getElementById('result');
	output.select();
	document.execCommand('copy');
}



function readFile(file) {
	if (file.type && file.type !== "image/png") {
		alert("File is not PNG.");
		const parsingResult= "The input image is not a PNG file. Please try again with a PNG file.";
		output.value = JSON.stringify(parsingResult, null, 2);
		return;
	}

	const reader = new FileReader();
	reader.readAsDataURL(file);

	reader.onload = function () {
		originalURL = reader.result;
		fileURL = reader.result;
		fileName = file.name;

		thumb.src = fileURL;
		thumb.style.display = "block";
	}
}

function stylize() {
	async function run_python_lib() {
		let pyodide = await loadPyodide();
		// await pyodide.loadPackage("shapely");
		await pyodide.loadPackage("micropip");
		const micropip = pyodide.pyimport("micropip");
		// micropip.install('albumentations');
		// await pyodide.loadPackage("albumentations");
		await pyodide.loadPackage("opencv-python");
		// await micropip.install('opencv-python');


		const script = `
				import js
				from js import image, console

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

				url = ','.join([hdr,str(new_bytes_data)[2:-1]])

				js.fileURL = url
		`;
				// js.thumb.src = url


		globalThis.image = pyodide.toPy(fileURL);
		pyodide.runPython(script);
		thumb.src = "";
		thumb.src = fileURL;
		run_pipeline();
	}
	run_python_lib();
}

function run_pipeline() {
	async function process(svg_str) {
		const { hasErrors, errors, content } = convert(svg_str);

		let pyodide = await loadPyodide();
		// await pyodide.loadPackage("shapely");
		await pyodide.loadPackage("micropip");
		const micropip = pyodide.pyimport("micropip");
		await micropip.install('shapely');


		const script = `
				import js
				from js import exc, smoothness, console

				from shapely.geometry import Polygon
				import numpy as np

				import json

				tax = .1*int(smoothness)

				for obj in exc['elements']:
					points = obj['points']
					p = Polygon(points)
					simplified = p.simplify(p.length / (tax*len(points)))
					xx, yy = simplified.exterior.coords.xy
					new_points = list(zip(xx,yy))
					obj['points'] = new_points

				exc["source"] = "https://www.politecnica.pucrs.br/laboratorios/lis/"
				exc["type"] = "excalidraw"
				exc["version"] = 2

				out = js.document.getElementById("result");
				out.value = json.dumps(exc, indent=4);
		`;

		globalThis.exc = pyodide.toPy(content);
		globalThis.smoothness = input.value;
		pyodide.runPython(script);
		// output.value = JSON.stringify(output.value, null, 2); 

		// $.post(
		// 	'/simplify',
		// 	{'excalidraw_data' : JSON.stringify(content), 'smoothness':input.value},
		// 	function(response, status){ 
		// 		output.value = JSON.stringify(response, null, 2); 
		// 	}
		// );
	}

	ImageTracer.imageToSVG(fileURL, process);
}