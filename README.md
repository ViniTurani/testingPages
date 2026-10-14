# Hopper-II · Image to Editable Vectors

Turn a PNG or JPG into editable vector shapes, right in the browser.

**Live:** https://viniturani.github.io/testingPages/

## How it works

1. **Choose an image** (or drop it on the page).
2. **Keep original** *(optional)*: draw a rectangle or a freehand lasso over the parts that must stay
   exactly as in the photo, with their original colors (a logo, a face, a screenshot...).
   Those parts are not vectorized; they are placed on top of the drawing as the original pixels.
3. **Vectorize**: *Convert* traces every color region into shapes. *Reduce colors, then convert*
   first groups similar colors (k-means), which gives fewer, cleaner shapes and drops the white background.
   *Smoothness* controls how much the outlines are simplified.
4. **Export** from the Result panel:
   - **Copy for Excalidraw**, then paste it into [excalidraw.com](https://excalidraw.com) (Ctrl/Cmd+V);
   - **.excalidraw** file, to open in Excalidraw;
   - **.svg** file, for any vector editor (Figma, Inkscape, Illustrator...).

Everything runs locally: [ImageTracer](https://github.com/jankovicsandras/imagetracerjs) does the tracing,
and [Pyodide](https://pyodide.org) runs Shapely (simplification) and OpenCV (color reduction) in the browser.
The image is never uploaded.

## Run locally

```bash
python3 -m http.server 5501
```

Then open http://localhost:5501.

---

This is an experiment from [LIS · PUCRS](https://www.politecnica.pucrs.br/laboratorios/lis/), generated with AI.
