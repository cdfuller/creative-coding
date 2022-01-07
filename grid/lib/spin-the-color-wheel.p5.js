var STCW_API_URL = "http://localhost:4000/api/v0/palettes";
let palette = ["#000000", "#FFFFFF"];
let randomPaletteButton;
let paletteIdInput;
let colorIndex = 0;

function randomPalette() {
  updatePalette("random");
  // fetch(url)
  // .then(data => data.json())
  // .then(res => res.data)
  // .then(newPalette => {
  //   palette = newPalette.colors;
  //   console.log("New palette:", newPalette.name);
  //   redraw();
  // })
}

function updatePalette(s) {
  let url = STCW_API_URL + "/" + s;
  fetch(url)
    .then(data => data.json())
    .then(res => res.data)
    .then(newPalette => {
      palette = newPalette.colors;
      console.log("Palette #", newPalette.id, '-', newPalette.name);
      redraw();
    })
}

function selectPalette(event) {
  updatePalette(event.target.value);
}

function getNextColor() {
  // return random(palette);
  let i = colorIndex % palette.length;
  colorIndex++;
  return palette[i];
}

function addColorInputs() {
  randomPaletteButton = createButton("Random Palette");
  randomPaletteButton.mousePressed(randomPalette);
  paletteIdInput = createInput("", "number");
  paletteIdInput.changed(selectPalette);
}