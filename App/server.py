from flask import Flask, request, render_template
from shapely import Polygon
import json

import static.utils as utils

import base64
import cv2
import os





if not os.path.exists('images'):
	os.makedirs('images')





app = Flask(__name__)



@app.route('/')
def index():
	return render_template('index.html')


@app.route('/stylize', methods=['POST', 'GET'])
def stylize():
	filename = request.form['name']
	encoded  = request.form['image'].split(',')[1]

	tmppath = os.path.join('static', 'tmp.png')
	outpath = os.path.join('images', filename)

	with open(tmppath, 'wb') as f:
		f.write(base64.b64decode(encoded))

	img = cv2.imread(tmppath, cv2.IMREAD_UNCHANGED)

	if len(img.shape)==3 and img.shape[-1] == 4:
		alpha = cv2.bitwise_not(img[...,3])
		img = img[...,:3]
		img[...,0] = cv2.bitwise_or(img[...,0], alpha)
		img[...,1] = cv2.bitwise_or(img[...,1], alpha)
		img[...,2] = cv2.bitwise_or(img[...,2], alpha)

	out = utils.stylize(img)
	cv2.imwrite(outpath, out)
	cv2.imwrite(tmppath, out)

	return {'url': tmppath}



@app.route('/simplify', methods=['POST', 'GET'])
def simplify():
	exc = json.loads(request.form['excalidraw_data'])
	smoothness = json.loads(request.form['smoothness'])

	tax = .1*smoothness

	for obj in exc['elements']:
		points = obj['points']
		p = Polygon(points)
		simplified = p.simplify(p.length / (tax*len(points)))
		xx, yy = simplified.exterior.coords.xy
		new_points = list(zip(xx,yy))
		obj['points'] = new_points

	return exc

if __name__ == '__main__':
	app.run(host='127.0.0.1', threaded=True)