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
    'Randomize': randomize,
    'Redraw': drawScreen,
  }

  let colors = gui.addFolder('Colors');
  colors.open();
  colors.addColor(config, 'Line color').listen();
  colors.addColor(config, 'BG color').listen();

  let lines = gui.addFolder('Lines');
  lines.open();
  lines.add(config, '# of lines').listen();
  lines.add(config, 'Line weight', 0.1, 5).step(0.1).listen();

  gui.add(config, 'Randomize');
  gui.add(config, 'Redraw');
}

function randomize(){
  config['# of lines'] =  int(random(250, 5000));
  config['Line weight'] =  random(0.1, 1.0);
  config['Line color'] =  [random(0, 255), random(0, 255), random(0, 255)];
  config['BG color'] =  [random(0, 255), random(0, 255), random(0, 255)];
  drawScreen();
}