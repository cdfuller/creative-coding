# Light Stretcher

Bring static images to life by stretching their brightest pixels along precise headings for deliberate glitch art.

## Project Overview
Light Stretcher is a browser-based p5.js sketch that accepts drag-and-drop images and repeats pixels in a configurable direction. Intensity scales linearly with luminance, so darker regions remain intact while bright regions fracture into trails. Sliders provide real-time control over the strength and heading of the effect.

## Getting Started
- Install dependencies for local tooling: `npm install --save-dev live-server`
- Launch a local preview from the repository root: `npx live-server --open=./index.html`
- Alternatively, use a one-off server: `npx serve .`

## Usage Notes
- Drop, paste, or open PNG, JPG, or GIF files directly into the sketch.
- Adjust intensity (0–250) to change repeat counts; direction (0–360° in 10° steps) rotates clockwise from the right, with the arrow indicator mirroring the heading.
- Choose priority strategies: luminance (with optional inversion), hue majority, directional sweep, or channel split to sculpt the glitch aesthetic.
- Fine-tune intensity and direction by typing exact values or using the sliders and arrow-aligned heading indicator.
- Flip the invert toggle to reverse any strategy—e.g., switch bright vs dark, seek rare hues, sweep from the opposite edge, or chase the lowest channel values.
- Apply glitches by dragging the intensity or direction sliders while holding the mouse or touch down; release to pause changes while keeping the preview visible.
- Use the Take Glitch button (or press ⌘/Ctrl + Enter) to commit the current preview to the base image before exploring additional variations.
- Save the committed result with the Save Image button once you are satisfied; the option stays disabled while a preview is pending.
- Use Reset only when you want to revert to the original image; otherwise keep tweaking controls to layer multiple glitches.
- Overshoot pixels are clipped at the canvas edge to preserve composition.
