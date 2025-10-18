/* global createCanvas, resizeCanvas, pixelDensity, loadImage, image, background, push, pop, translate, scale, radians, cos, sin, noStroke, fill, textAlign, text */

let canvas;
let originalImage = null;
let workingImage = null;
let glitchImage = null;
let needsUpdate = false;

let intensitySlider;
let directionSlider;
let directionOutput;
let directionArrow;
let intensityInput;
let directionInput;
let fileInput;
let fileSelectButton;
let prioritySelect;
let invertCheckbox;
let takeButton;
let resetButton;
let saveButton;
let dropOverlay;
let canvasWrapper;
let isPointerEngaged = false;
let previewPending = false;
let previewTimer = null;

function setup() {
  const host = document.getElementById('p5-container');
  const width = host.clientWidth || window.innerWidth;
  const height = host.clientHeight || window.innerHeight;

  canvas = createCanvas(width, height);
  canvas.parent('p5-container');
  pixelDensity(1);

  dropOverlay = document.getElementById('drop-overlay');
  canvasWrapper = document.querySelector('.canvas-wrapper');

  intensitySlider = document.getElementById('intensity-slider');
  directionSlider = document.getElementById('direction-slider');
  intensityInput = document.getElementById('intensity-input');
  directionInput = document.getElementById('direction-input');
  directionOutput = document.getElementById('direction-value');
  directionArrow = document.getElementById('direction-arrow');
  fileInput = document.getElementById('file-input');
  fileSelectButton = document.getElementById('file-select');
  prioritySelect = document.getElementById('priority-select');
  invertCheckbox = document.getElementById('invert-priority');
  takeButton = document.getElementById('take-glitch');
  resetButton = document.getElementById('reset-glitch');
  saveButton = document.getElementById('save-image');

  canvas.drop(handleFile);
  setupDragOverlay();
  bindControls();
  registerPasteListener();
}

function windowResized() {
  const host = document.getElementById('p5-container');
  const width = host.clientWidth || window.innerWidth;
  const height = host.clientHeight || window.innerHeight;
  resizeCanvas(width, height);
}

function draw() {
  background(9, 12, 16);

  if (workingImage && needsUpdate) {
    renderPreview();
    needsUpdate = false;
  }

  if (glitchImage) {
    const scaleFactor = Math.min(
      width / glitchImage.width,
      height / glitchImage.height
    );
    const drawWidth = glitchImage.width * scaleFactor;
    const drawHeight = glitchImage.height * scaleFactor;
    const offsetX = (width - drawWidth) / 2;
    const offsetY = (height - drawHeight) / 2;

    push();
    translate(offsetX, offsetY);
    scale(scaleFactor);
    image(glitchImage, 0, 0);
    pop();

    dropOverlay.classList.remove('visible');
  } else {
    dropOverlay.classList.add('visible');
    renderPlaceholder();
  }
}

function bindControls() {
  if (intensityInput) {
    intensityInput.value = intensitySlider.value;
  }
  if (directionInput) {
    directionInput.value = directionSlider.value;
  }
  updateDirectionDisplay(Number(directionSlider.value));
  updateTakeButtonState();
  updatePriorityDescription();

  bindPointerEngagement(intensitySlider);
  bindPointerEngagement(directionSlider);

  intensitySlider.addEventListener('input', () => {
    if (intensityInput) {
      intensityInput.value = intensitySlider.value;
    }
    queuePreview();
  });

  if (intensityInput) {
    intensityInput.addEventListener('change', () => {
      const value = clampValue(Number(intensityInput.value), 0, 250);
      intensityInput.value = value;
      intensitySlider.value = value;
      queuePreview(true);
    });
  }

  directionSlider.addEventListener('input', () => {
    const snappedValue = Math.round(Number(directionSlider.value) / 10) * 10;
    const constrained = ((snappedValue % 360) + 360) % 360;
    directionSlider.value = constrained;
    if (directionInput) {
      directionInput.value = constrained;
    }
    updateDirectionDisplay(constrained);
    queuePreview();
  });

  if (directionInput) {
    directionInput.addEventListener('change', () => {
      const snappedValue = Math.round(Number(directionInput.value) / 10) * 10;
      const constrained = clampValue(((snappedValue % 360) + 360) % 360, 0, 360);
      directionInput.value = constrained;
      directionSlider.value = constrained;
      updateDirectionDisplay(constrained);
      queuePreview(true);
    });
  }

  prioritySelect.addEventListener('change', () => {
    queuePreview(true);
    updatePriorityDescription();
  });

  if (invertCheckbox) {
    invertCheckbox.addEventListener('change', () => {
      queuePreview(true);
      updatePriorityDescription();
    });
  }

  fileSelectButton.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleNativeFile(files[0]);
    }
    event.target.value = '';
  });

  resetButton.addEventListener('click', () => {
    resetWorkingImage();
  });

  if (takeButton) {
    takeButton.addEventListener('click', () => {
      commitPreview();
    });
  }

  if (saveButton) {
    saveButton.addEventListener('click', () => {
      saveSnapshot();
    });
  }
}

function bindPointerEngagement(element) {
  element.addEventListener('pointerdown', () => {
    isPointerEngaged = true;
    updateTakeButtonState();
  });

  element.addEventListener('pointerup', () => {
    isPointerEngaged = false;
    updateTakeButtonState();
  });

  element.addEventListener('pointercancel', () => {
    isPointerEngaged = false;
    updateTakeButtonState();
  });

  element.addEventListener('pointerleave', (event) => {
    if (event.buttons === 0) {
      isPointerEngaged = false;
      updateTakeButtonState();
    }
  });
}

function queuePreview(force = false) {
  if (!workingImage) {
    return;
  }

  previewPending = false;

  if (previewTimer) {
    clearTimeout(previewTimer);
    previewTimer = null;
  }

  if (force) {
    needsUpdate = true;
    updateTakeButtonState();
    return;
  }

  if (isPointerEngaged) {
    let debounceDelay = 50;
    previewTimer = setTimeout(() => {
      needsUpdate = true;
      previewTimer = null;
      updateTakeButtonState();
    }, debounceDelay);
    updateTakeButtonState();
  } else {
    needsUpdate = true;
    updateTakeButtonState();
  }
}

function setupDragOverlay() {
  const host = document.getElementById('p5-container');
  let dragDepth = 0;

  host.addEventListener('dragenter', (event) => {
    event.preventDefault();
    dragDepth += 1;
    dropOverlay.classList.add('visible');
    dropOverlay.classList.add('highlight');
    canvasWrapper?.classList.add('highlight-drop');
  });

  host.addEventListener('dragleave', (event) => {
    event.preventDefault();
    dragDepth = Math.max(0, dragDepth - 1);
    if (dragDepth === 0 && glitchImage) {
      dropOverlay.classList.remove('visible');
    }
    if (dragDepth === 0) {
      dropOverlay.classList.remove('highlight');
      canvasWrapper?.classList.remove('highlight-drop');
    }
  });

  host.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  host.addEventListener('drop', (event) => {
    event.preventDefault();
    dragDepth = 0;
    dropOverlay.classList.remove('visible');
    dropOverlay.classList.remove('highlight');
    canvasWrapper?.classList.remove('highlight-drop');
  });
}

function handleFile(file) {
  if (!file || !file.type || !file.type.startsWith('image/')) {
    console.warn('Unsupported file:', file?.name || 'unknown');
    return;
  }

  loadFromDataUrl(file.data);
}

function handleNativeFile(file) {
  if (!file || !file.type || !file.type.startsWith('image/')) {
    console.warn('Unsupported file:', file?.name || 'unknown');
    return;
  }

  readFileAsDataUrl(file)
    .then((dataUrl) => {
      loadFromDataUrl(dataUrl);
    })
    .catch((error) => {
      console.error('Failed to read file', error);
    });
}

function prepareImage(img) {
  const maxEdge = 900;
  const largestDimension = Math.max(img.width, img.height);

  if (largestDimension > maxEdge) {
    const scale = maxEdge / largestDimension;
    const targetWidth = Math.max(1, Math.round(img.width * scale));
    const targetHeight = Math.max(1, Math.round(img.height * scale));
    img.resize(targetWidth, targetHeight);
  }

  originalImage = img;
  workingImage = img.get();
  syncDisplayWithWorking();
  previewPending = false;
  needsUpdate = false;
  isPointerEngaged = false;
  if (invertCheckbox) {
    invertCheckbox.checked = false;
  }
  updatePriorityDescription();
  updateTakeButtonState();
}

function resetWorkingImage() {
  if (!originalImage) {
    return;
  }

  workingImage = originalImage.get();
  syncDisplayWithWorking();
  needsUpdate = false;
  isPointerEngaged = false;
  previewPending = false;
  if (invertCheckbox) {
    invertCheckbox.checked = false;
  }
  updatePriorityDescription();
  updateTakeButtonState();
}

function renderPreview() {
  if (!workingImage) {
    return;
  }

  const intensity = Number(intensitySlider.value);
  const directionDegrees = Number(directionSlider.value);
  const priorityMode = prioritySelect?.value || 'luminance';
  const invert = Boolean(invertCheckbox?.checked);

  workingImage.loadPixels();
  const preview = workingImage.get();
  preview.loadPixels();

  const width = workingImage.width;
  const height = workingImage.height;
  const totalPixels = width * height;
  const dirRadians = radians(directionDegrees);
  const dirX = cos(dirRadians);
  const dirY = sin(dirRadians);
  const pixels = preview.pixels;
  const sourcePixels = workingImage.pixels;

  const HUE_BUCKETS = 12;
  let luminanceOwners;
  let directionalScores;
  let hueCounts;
  let hueBestCount;
  let hueBestBucket;
  let channelR;
  let channelG;
  let channelB;
  let channelA;
  let channelInitialized;

  switch (priorityMode) {
    case 'luminance':
      luminanceOwners = new Float32Array(totalPixels);
      luminanceOwners.fill(invert ? Number.POSITIVE_INFINITY : -Infinity);
      break;
    case 'directional':
      directionalScores = new Float32Array(totalPixels);
      directionalScores.fill(invert ? Number.POSITIVE_INFINITY : -Infinity);
      break;
    case 'hue-majority':
      hueCounts = new Uint16Array(totalPixels * HUE_BUCKETS);
      hueBestCount = new Float32Array(totalPixels);
      hueBestBucket = new Int16Array(totalPixels);
      hueBestBucket.fill(-1);
      if (invert) {
        hueBestCount.fill(Number.POSITIVE_INFINITY);
      }
      break;
    case 'channel':
      channelR = new Uint8Array(totalPixels);
      channelG = new Uint8Array(totalPixels);
      channelB = new Uint8Array(totalPixels);
      channelA = new Uint8Array(totalPixels);
      channelInitialized = new Uint8Array(totalPixels);
      if (invert) {
        channelR.fill(255);
        channelG.fill(255);
        channelB.fill(255);
        channelA.fill(255);
      }
      break;
    default:
      luminanceOwners = new Float32Array(totalPixels);
      luminanceOwners.fill(invert ? Number.POSITIVE_INFINITY : -Infinity);
  }

  if (intensity === 0) {
    preview.updatePixels();
    glitchImage = preview;
    previewPending = false;
    updateTakeButtonState();
    return;
  }

  let wrotePixel = false;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4;
      const r = sourcePixels[index];
      const g = sourcePixels[index + 1];
      const b = sourcePixels[index + 2];
      const a = sourcePixels[index + 3];

      if (a === 0) {
        continue;
      }

      const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      if (luminance <= 0) {
        continue;
      }

      const repeats = Math.floor((luminance / 255) * intensity);
      if (repeats <= 0) {
        continue;
      }

      let offsetX = x;
      let offsetY = y;

      for (let step = 1; step <= repeats; step += 1) {
        offsetX += dirX;
        offsetY += dirY;

        const drawX = Math.round(offsetX);
        const drawY = Math.round(offsetY);

        if (drawX < 0 || drawX >= width || drawY < 0 || drawY >= height) {
          break;
        }

        const targetIndex = (drawY * width + drawX) * 4;
        const flatIndex = drawY * width + drawX;

        switch (priorityMode) {
          case 'luminance': {
            const current = luminanceOwners[flatIndex];
            const shouldReplace = invert
              ? luminance <= current
              : luminance >= current;
            if (shouldReplace) {
              luminanceOwners[flatIndex] = luminance;
              pixels[targetIndex] = r;
              pixels[targetIndex + 1] = g;
              pixels[targetIndex + 2] = b;
              pixels[targetIndex + 3] = a;
              wrotePixel = true;
            }
            break;
          }
          case 'directional': {
            const score = step;
            const current = directionalScores[flatIndex];
            const shouldReplace = invert
              ? score <= current
              : score >= current;
            if (shouldReplace) {
              directionalScores[flatIndex] = score;
              pixels[targetIndex] = r;
              pixels[targetIndex + 1] = g;
              pixels[targetIndex + 2] = b;
              pixels[targetIndex + 3] = a;
              wrotePixel = true;
            }
            break;
          }
          case 'hue-majority': {
            const hue = rgbToHue(r, g, b);
            let bucket = Math.floor((hue / 360) * HUE_BUCKETS);
            if (bucket < 0) {
              bucket = 0;
            } else if (bucket >= HUE_BUCKETS) {
              bucket = HUE_BUCKETS - 1;
            }
            const countIndex = flatIndex * HUE_BUCKETS + bucket;
            const newCount = hueCounts[countIndex] + 1;
            hueCounts[countIndex] = newCount;
            const bestCount = hueBestCount[flatIndex];
            const bestBucket = hueBestBucket[flatIndex];
            let shouldReplace = false;
            if (bestBucket === -1) {
              shouldReplace = true;
            } else if (!invert && newCount >= bestCount && bucket === bestBucket) {
              shouldReplace = true;
            } else if (!invert && newCount > bestCount) {
              shouldReplace = true;
            } else if (invert && (newCount <= bestCount || bestCount === Number.POSITIVE_INFINITY)) {
              shouldReplace = true;
            }

            if (shouldReplace) {
              hueBestCount[flatIndex] = newCount;
              hueBestBucket[flatIndex] = bucket;
              pixels[targetIndex] = r;
              pixels[targetIndex + 1] = g;
              pixels[targetIndex + 2] = b;
              pixels[targetIndex + 3] = a;
              wrotePixel = true;
            }
            break;
          }
          case 'channel': {
            const initialized = channelInitialized[flatIndex] === 1;
            let updated = false;

            if (!initialized) {
              channelR[flatIndex] = r;
              channelG[flatIndex] = g;
              channelB[flatIndex] = b;
              channelA[flatIndex] = a;
              channelInitialized[flatIndex] = 1;
              updated = true;
            } else if (!invert) {
              if (r > channelR[flatIndex]) {
                channelR[flatIndex] = r;
                updated = true;
              }
              if (g > channelG[flatIndex]) {
                channelG[flatIndex] = g;
                updated = true;
              }
              if (b > channelB[flatIndex]) {
                channelB[flatIndex] = b;
                updated = true;
              }
              if (a > channelA[flatIndex]) {
                channelA[flatIndex] = a;
                updated = true;
              }
            } else {
              if (r < channelR[flatIndex]) {
                channelR[flatIndex] = r;
                updated = true;
              }
              if (g < channelG[flatIndex]) {
                channelG[flatIndex] = g;
                updated = true;
              }
              if (b < channelB[flatIndex]) {
                channelB[flatIndex] = b;
                updated = true;
              }
              if (a < channelA[flatIndex]) {
                channelA[flatIndex] = a;
                updated = true;
              }
            }

            if (updated) {
              pixels[targetIndex] = channelR[flatIndex];
              pixels[targetIndex + 1] = channelG[flatIndex];
              pixels[targetIndex + 2] = channelB[flatIndex];
              pixels[targetIndex + 3] = channelA[flatIndex];
              wrotePixel = true;
            }
            break;
          }
          default:
            break;
        }
      }
    }
  }

  preview.updatePixels();
  glitchImage = preview;
  previewPending = wrotePixel;
  updateTakeButtonState();
}

function commitPreview() {
  if (!glitchImage || !previewPending) {
    return;
  }

  workingImage = glitchImage.get();
  previewPending = false;
  isPointerEngaged = false;
  syncDisplayWithWorking();
  updateTakeButtonState();
}

function syncDisplayWithWorking() {
  glitchImage = workingImage ? workingImage.get() : null;
  if (!workingImage) {
    previewPending = false;
  }
}

function updateDirectionDisplay(value) {
  directionOutput.textContent = `${value}°`;
  if (directionArrow) {
    directionArrow.style.transform = `rotate(${value}deg)`;
  }
}

function updateTakeButtonState() {
  if (!takeButton) {
    return;
  }

  takeButton.disabled = !(previewPending && glitchImage);

  if (saveButton) {
    saveButton.disabled =
      !workingImage || previewPending || needsUpdate || isPointerEngaged || previewTimer !== null;
  }
}

function saveSnapshot() {
  if (!workingImage) {
    return;
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `light-stretcher-${timestamp}`;
  workingImage.save(filename, 'png');
}

function updatePriorityDescription() {
  const description = document.getElementById('priority-description');
  if (!description || !prioritySelect) {
    return;
  }
  const invert = Boolean(invertCheckbox?.checked);
  const textMap = {
    luminance: invert
      ? 'Darkest pixels grab the trail; uncheck invert to let brighter tones win.'
      : 'Brightest pixels claim the trail; invert to favor darker tones.',
    'hue-majority': invert
      ? 'Rare hues take precedence, highlighting subtle colors.'
      : 'Dominant hues consolidate the trail for cohesive color bands.',
    directional: invert
      ? 'Pixels further opposite the heading overwrite closer ones for reverse streaks.'
      : 'Pixels further along the heading overwrite trailing ones for pronounced motion.',
    channel: invert
      ? 'Lower channel values replace brighter ones per component for muted blends.'
      : 'Highest channel values per RGB component shine through, splitting colors.'
  };
  description.textContent = textMap[prioritySelect.value] || '';
}

function rgbToHue(r, g, b) {
  const nr = r / 255;
  const ng = g / 255;
  const nb = b / 255;
  const max = Math.max(nr, ng, nb);
  const min = Math.min(nr, ng, nb);
  const delta = max - min;

  if (delta === 0) {
    return 0;
  }

  let hue;
  if (max === nr) {
    hue = ((ng - nb) / delta) % 6;
  } else if (max === ng) {
    hue = (nb - nr) / delta + 2;
  } else {
    hue = (nr - ng) / delta + 4;
  }

  hue *= 60;
  if (hue < 0) {
    hue += 360;
  }
  return hue;
}

function renderPlaceholder() {
  push();
  noStroke();
  fill(230, 235, 240, 60);
  textAlign(CENTER, CENTER);
  const headline = 'Drop an image to start glitching';
  const subline = 'PNG, JPG, or GIF – pixels only.';
  text(headline, width / 2, height / 2 - 20);
  fill(230, 235, 240, 45);
  text(subline, width / 2, height / 2 + 20);
  pop();
}

function loadFromDataUrl(dataUrl) {
  loadImage(
    dataUrl,
    (img) => {
      prepareImage(img);
    },
    (error) => {
      console.error('Failed to load image', error);
    }
  );
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

function registerPasteListener() {
  window.addEventListener('paste', (event) => {
    const items = event.clipboardData?.items || [];
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) {
          handleNativeFile(file);
          break;
        }
      }
    }
  });
}

window.addEventListener('pointerup', () => {
  isPointerEngaged = false;
  updateTakeButtonState();
});

window.addEventListener('pointercancel', () => {
  isPointerEngaged = false;
  updateTakeButtonState();
});

window.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
    if (previewPending && glitchImage) {
      event.preventDefault();
      commitPreview();
    }
  }
});

function clampValue(value, min, max) {
  if (Number.isNaN(value)) {
    return min;
  }
  return Math.min(Math.max(value, min), max);
}
