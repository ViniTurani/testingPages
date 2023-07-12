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
	function process(svg_str) {
		const { hasErrors, errors, content } = convert(svg_str);

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