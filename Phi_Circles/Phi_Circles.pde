import java.util.Date;
float r;
int numColors = 20;

// Angle and angular velocity, accleration
float theta;
float h;
float ellipse_radius;

color[] palette;
int palette_index;

void setup() {
  size(900, 900);

  
  // Initialize all values
  r = width * 0.8;
  theta = 0;
  colorMode(HSB, 360, 100, 100);
  frameRate(100000);
     background(50, 80, 90);
}

void draw() {
  
  // Translate the origin point to the center of the screen
  translate(width/2, height/2);
  drawScreen();

}

void drawScreen(){

  palette = generate_color_palette(numColors);
  // Convert polar to cartesian
  float x = r * cos(theta);
  float y = r * sin(theta);
  
  // Draw the ellipse at the cartesian coordinate
  ellipseMode(CENTER);
//  noStroke();
  fill(get_color_from_palette());
  
  if( r > 25){
    ellipse_radius = r  * .5;
  }
    ellipse(x, y, ellipse_radius, ellipse_radius);
  
  theta += 2.4;
  if( r > 4){
    r -= 1;
  } else {
    noLoop();
  }
   
}

void keyPressed(){
  if (key == ' '){
    background(50, 80, 90);
    r = height * 0.6;
    ellipse_radius = r  * .5;
    theta = 0;
    drawScreen();
    redraw();
  } else if (key == 's'){
    save_image();
  }
}



float get_hue(String method){
  if(method == "rainbow"){
    if (h >= 360) h=0; else h += 4;
    println("Rainbow hue: ", h);
    return h;
  } else if (method == "random"){
    float r = random(360);
    println("Random hue: ", r);
    return r;
  }
  return float(0);
}

color[] generate_color_palette(int n){
  color[] cols = new color[n];
  float h = random(0, 360);
  float offset = 137.5;

  for(int i=0; i<n; i++){
    float ch = (h + (offset * i)) % 360;
    color c = color(ch, 85, 90);
    cols[i] = c;
    println((int) hue(c)+ ", " + (int) saturation(c) + ", " + (int) brightness(c));
  }
  return cols;
}

color get_color_from_palette(){
  int index = palette_index;
  palette_index = (palette_index + 1) % numColors;
  return palette[index];
}

void save_image(){
  Date d = new Date();
  long current = d.getTime()/1000;
  String str = "images/img_" + current + ".png";
  saveFrame(str);
  println("Image saved as ", str);
}

