const express = require('express');
const app = express();
const fs = require('fs');
const { Polygon } = require('shapely');
const base64 = require('base64-js');
const cv = require('opencv');

const utils = require('./static/utils');

if (!fs.existsSync('images')) {
  fs.mkdirSync('images');
}

app.get('/', (req, res) => {
  res.render('index.html');
});

app.post('/stylize', (req, res) => {
  const filename = req.body.name;
  const encoded = req.body.image.split(',')[1];

  const tmppath = 'static/tmp.png';
  const outpath = `images/${filename}`;

  const buffer = base64.toByteArray(encoded);
  fs.writeFileSync(tmppath, buffer);

  cv.readImage(tmppath, (err, img) => {
    if (img.channels() === 4) {
      const alpha = img.channel(3).bitwiseNot();
      img = img.cvtColor(cv.COLOR_RGBA2RGB);
      img.bitwiseOr(alpha);
    }

    const out = utils.stylize(img);
    cv.imwrite(outpath, out);
    cv.imwrite(tmppath, out);

    res.json({ url: tmppath });
  });
});

app.post('/simplify', (req, res) => {
  const exc = JSON.parse(req.body.excalidraw_data);
  const smoothness = JSON.parse(req.body.smoothness);

  const tax = 0.1 * smoothness;

  for (const obj of exc.elements) {
    const points = obj.points;
    const p = new Polygon(points);
    const simplified = p.simplify(p.length / (tax * points.length));
    const { x, y } = simplified.exterior.coords;
    const newPoints = x.map((_, i) => [x[i], y[i]]);
    obj.points = newPoints;
  }

  res.json(exc);
});

app.listen(8000, '127.0.0.1', () => {
  console.log('Server running at http://127.0.0.1:8000/');
});

if (process.argv.length > 2 && process.argv[2] === 'build') {
  freezer.freeze();
} else {
  app.run(port=8000);
}
