

async function main() {
  let pyodide = await loadPyodide();
  await pyodide.loadPackage("numpy");


  const script = `
  		import numpy as np
  		import js
  		from js import data, smoothness, console

  		res = .1 * int(smoothness)

  		out = js.document.getElementById("result");
  		out.value = res;
  `;

  globalThis.data = pyodide.toPy(JSON.stringify([0.8, 0.4, 1.2, 3.7, 2.6, 5.8]));
	globalThis.smoothness = input.value;
  pyodide.runPython(script);
}
main();

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
	$.post(
		'/stylize',
		{'name' : fileName, 'image' : originalURL},
		function(response, status){ 
			fileURL = response['url'];
			thumb.src = fileURL+"?timestamp=" + new Date().getTime();
		}
	);
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
				from js import exc, console, smoothness
				from shapely.geometry import Polygon
				import numpy as np
				import json
				import js

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