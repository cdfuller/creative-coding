float cs = 10;
float cell_num_vert, cell_num_horz;

void setup() {
  size(800, 800);
  background(255);
  cell_num_vert = height / cs;
  cell_num_horz = width / cs;
  drawScreen();
  saveFrame("labyrinth-01.png");
}

void draw() {
}


void drawScreen() {
  strokeWeight(2);
  stroke(0);
  strokeCap(SQUARE);
  for (int y=0; y < cell_num_vert; y++) {
    for (int x=0; x < cell_num_horz; x++) {
      float r = random(500);
      float xx = x * cs;
      float yy = y * cs;
      float xc = xx + cs/2;
      if (r <= 25){
        // Left
        line(xc, yy, xc-cs, yy);
      } else if (r > 25 && r < 75){
        // Right 
        line(xc, yy, xc+cs, yy);
      } else if (r >= 75){
        // Down
        line(xc, yy, xc, yy + cs); 
      }
    }
  }
}