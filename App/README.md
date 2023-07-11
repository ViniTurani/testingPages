
# Image to Excalidraw format
Excalidraw is an application that allows you to create diagrams that look hand-drawn.
This repository contains a Flask application that takes an image and converts it to the Excalidraw format.


## Running the application

### Requirements
- Python 3
- Flask 2.2+
- Shapely 2.0+
- Albumentations 1.3+
- OpenCV 4.7+

### Launching the server
Open a terminal in the folder  `HopperII/API_test` and execute the line: 
```
python3 server.py
```

## Pipeline
The application provided employs the following pipeline to transform input images into a file importable by Excalidraw.
- The user starts by inputting PNG, JPEG, or JPG images.
- The file is then converted to SVG using the JavaScript library [imagetracerjs](https://github.com/jankovicsandras/imagetracerjs), an open-source tracing algorithm to convert images to vectors.
- To get a better result, the user can reduce the number of colors of the PNG to simplify the image; this is especially relevant in images that contain color gradients. We employed the K-Means algorithm to estimate the optimal number of colors for the image. After simplifying the image, we also apply a slight distortion to it, using the PieceWise transformation to give it a more "hand-drawn" appearance.
- After that, the image goes through another conversion from SVG to an Excalidraw object written in a JSON format using the JavaScript library [SVG-to-Excalidraw](https://github.com/excalidraw/svg-to-excalidraw).
- We implemented a function from the Python library [Shapely](https://shapely.readthedocs.io/en/stable/) to reduce the number of points of each object to increase performance. The user can adjust the proportion of points using a slider on the application to adjust their performance/quality trade-off. 
- After the image is selected and transformed to an SVG image and then to an Excalidraw object, the user can click "copy to clipboard" and paste the output file directly into the Excalidraw environment.

## Resources used

- [Excalidraw](https://excalidraw.com/)
- [SVG-to-Excalidraw](https://github.com/excalidraw/svg-to-excalidraw)
- [imagetracerjs](https://github.com/jankovicsandras/imagetracerjs)
- [Flask](https://flask.palletsprojects.com/en/)
- [Shapely](https://shapely.readthedocs.io/en/stable/)
