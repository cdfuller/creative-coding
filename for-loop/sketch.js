config = {
  'Line color': { h: 155, s: 0.95, v: 0.89},
  'BG color': { h: 22, s: 0.4, v: 0.0 },
  '# of lines': 10000,
  'Line weight': 0.2,
  'Hue variation': 0.005,
  'Sat variation': 0.01,
  'Bri variation': 0.01,
  'Redraw': drawScreen,
}

function setup() {
  createCanvas(1000, 1000);
  colorMode(HSB);
  drawGUI();
  drawScreen();
}


function drawScreen() {
  let bg_color = convertDatGUIHSBToP5Array(config['BG color']);
  background(bg_color);

  let stroke_color = convertDatGUIHSBToP5Array(config['Line color']);
  stroke(stroke_color);

  strokeWeight(config['Line weight']);

  let spacing = width / config['# of lines'];

  // Noise offsets
  let h_off = stroke_color[0];
  let s_off = stroke_color[1];
  let b_off = stroke_color[2];

  // Total variation
  let h_var = config['Hue variation'];
  let s_var = config['Sat variation'];
  let b_var = config['Bri variation'];

  for(let x = 0; x < width; x += spacing) {
    let x2 = random(width);

    let h_diff = (noise(h_off) * h_var) - (h_var/2);
    h = (h_diff + h_off + 360) % 360;

    let s_diff = (noise(s_off) * s_var) - (s_var/2);
    s = max(min((s_diff + s_off + 100) % 100, 100), 75);

    let b_diff = (noise(b_off) * b_var) - (b_var/2);
    b = max(min((b_diff + b_off + 100) % 100, 100), 75);

    stroke(h, s, b);
    line(x, 0, x2, height);

    h_off += h_var;
    b_off += b_var;
    s_off += s_var;
  }
}

function drawGUI() {
  let gui = new dat.GUI();
  let colors = gui.addFolder('Colors');
  colors.open();
  colors.addColor(config, 'Line color');
  colors.addColor(config, 'BG color');
  colors.add(config, 'Hue variation', 0, 0.1).step(0.0001);
  colors.add(config, 'Sat variation', 0, 0.1).step(0.0001);
  colors.add(config, 'Bri variation', 0, 0.1).step(0.0001);

  let lines = gui.addFolder('Lines');
  lines.open();
  lines.add(config, '# of lines').min(0).step(100);
  lines.add(config, 'Line weight', 0.1, 5).step(0.1);

  gui.add(config, 'Redraw');
}


function convertDatGUIHSBToP5Array(color_obj) {
  return [color_obj['h'], color_obj['s'] * 100, color_obj['v'] * 100 ];
}