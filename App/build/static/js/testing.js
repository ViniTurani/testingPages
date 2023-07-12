const express = require('express');
const app = express();
const port = 8000;

const fs = require('fs');
const path = require('path');
const base64 = require('base64-js');
const cv = require('opencv4nodejs');
const { Polygon } = require('shapely');
const utils = require('./static/utils');

if (!fs.existsSync('images')) {
  fs.mkdirSync('images');
}

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.render('index.html');
});

app.post('/stylize', (req, res) => {
  const filename = req.body.name;
  const encoded = req.body.image.split(',')[1];

  const tmppath = path.join('static', 'tmp.png');
  const outpath = path.join('images', filename);

  const decoded = base64.toByteArray(encoded);
  fs.writeFileSync(tmppath, decoded);

  const img = cv.imread(tmppath, cv.IMREAD_UNCHANGED);

  if (img.channels === 4) {
    const alpha = cv.bitwiseNot(img.getRegion(new cv.Rect(0, 0, img.cols, img.rows)).splitChannels()[3]);
    img.setRegion(alpha, new cv.Rect(0, 0, img.cols, img.rows));
  }

  const out = utils.stylize(img);
  cv.imwrite(outpath, out);
  cv.imwrite(tmppath, out);

  res.json({ url: tmppath });
});

app.post('/simplify', (req, res) => {
  const exc = JSON.parse(req.body.excalidraw_data);
  const smoothness = JSON.parse(req.body.smoothness);
  const tax = 0.1 * smoothness;

  for (const obj of exc.elements) {
    const points = obj.points;
    const p = new Polygon(points);
    const simplified = p.simplify(p.length / (tax * points.length));
    const [xx, yy] = simplified.exterior.coords.xy;
    const newPoints = xx.map((x, i) => [x, yy[i]]);
    obj.points = newPoints;
  }

  res.json(exc);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
