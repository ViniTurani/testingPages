# Hopper-II · Image to Editable Vectors

Turn a PNG or JPG into editable vector shapes, right in the browser.

**Live:** https://viniturani.github.io/testingPages/

## How it works

1. **Choose an image** (or drop it on the page).
2. **Keep original** *(optional)*: select the parts that must stay exactly as in the photo, with
   their original colors (a logo, a face, a screenshot...). Those parts are not vectorized; they are
   placed on top of the drawing as the original pixels.
   - **Rectangle** or **Lasso** to draw the area by hand;
   - **Magic** to click an object and get its exact outline, from a small Segment Anything model
     ([SlimSAM](https://huggingface.co/Xenova/slimsam-77-uniform), ~14 MB, downloaded once) running in
     the browser with [transformers.js](https://github.com/huggingface/transformers.js).
     Shift+click adds to the selection, Alt+click removes a part;
   - **Invert** keeps everything *except* the selection: click the subject with Magic, turn on Invert,
     and only the subject is vectorized while the background stays as in the photo.
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
