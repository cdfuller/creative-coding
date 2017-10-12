function setup() {
  createCanvas(1000, 1000);
  drawGUI();
}

function draw() {
  drawScreen();
  noLoop();
}

function drawScreen() {
  background(config['BG color']);
  stroke(config['Line color']);
  strokeWeight(config['Line weight']);
  let spacing = width / config['# of lines'];
  for(let x = 0; x < width; x += spacing) {
    let x2 = random(width);
    line(x, 0, x2, height);
  }
  console.table(config);
}

function drawGUI() {
  let gui = new dat.GUI();
  config = {
    'Line color': [42, 226, 29],
    'BG color': [22, 18, 79],
    '# of lines': 10000,
    'Line weight': 0.2,
    'Redraw': drawScreen,
  }

  let colors = gui.addFolder('Colors');
  colors.open();
  colors.addColor(config, 'Line color');
  colors.addColor(config, 'BG color');

  let lines = gui.addFolder('Lines');
  lines.open();
  lines.add(config, '# of lines').min(0).step(100);
  lines.add(config, 'Line weight', 0.1, 5).step(0.1);

  gui.add(config, 'Redraw');
}
