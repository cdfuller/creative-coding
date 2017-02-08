import java.util.Date;
float x1, x2, x3, y1, y2, y3;
float h;
float s_min = 65;
float s_max = 90;
float s = get_saturation(s_min, s_max);
float b_min = 70;
float b_max = 90;
float b = get_brightness(b_min, b_max);
float triangle_side_length = 60;
float triangle_height = sqrt(sq(triangle_side_length) - sq(triangle_side_length / 2));
color current_color;

color[]palette = {#BDD6F1,#A8CEF9,#7EA3E7,#6E95E0,#5178D8,#3E66E0,#2D59E2,
#2F58D9,#385FDD,#3150C0,#3053D3,#324DB4,#3D56B7,#2946B7,#2548D1,#1D40D5,
#1832AE,#1B32A9,#192DA5,#162CB4,#12259D,#272C9D,#6B5BBC,#3A287E,
#AD92BA,#602B6B,#BE4086,#9D4776,#A52849,#9C182E};



void setup(){
  size(900, 900);
  background(get_color_from_palette(palette));
  colorMode(HSB, 360, 100, 100);
  smooth(8);
}

void draw(){
  noStroke();
  drawScreen();
  noLoop();
}

void drawScreen(){
  
  color[] generated_palette = generate_colors(12);
  
  for(int x=(int)-triangle_side_length/2; x < width; x+=triangle_side_length - 1){
    for(int y=0; y < height + triangle_height; y+= triangle_height - 1){
//      fill(get_hue("random"), get_saturation(s_min, s_max), get_brightness(b_min, b_max));
//      color c = get_color_from_palette(palette);
//      float ch = hue(c);
//      float cs = 80 - (random(0, 1) * map(x, 0, width, 25, 75));
//      float cb = 100- random(0, 40);
      fill(generated_palette[(int) random(0, 12)]);
      equilateral_triangle(x, y, "up");
    }
    for(int y=0; y < height + triangle_height; y+= triangle_height - 1){
//      fill(get_hue("random"), get_saturation(s_min, s_max),get_brightness(b_min, b_max));
//      color c = get_color_from_palette(palette);
//      float ch = hue(c);
//      float cs = 100 - (random(0, 1) * map(y, 0, height, 25, 100));
//      float cb = 100 + (random(0, 1) * map(y, 0, height, 50, 100));
      fill(generated_palette[(int) random(0, 12)]);
      equilateral_triangle(x + triangle_side_length / 2, y, "down");
    }
  }
}

void equilateral_triangle(float x, float y, String direction){
  
  float x2 = x + triangle_side_length;
  float x3 = x + (triangle_side_length / 2);
  float y3;
  
  if( direction == "up"){
    y3 = y - triangle_height;
  } else if ( direction == "down"){
    y3 = y + triangle_height;
  } else {
    y3 = 0;
  }
  triangle(x, y, x2, y, x3, y3);
}


float get_hue(String method){
  if(method == "rainbow"){
    if (h >= 360) h=0; else h += 4;
//    println("Rainbow hue: ", h);
    return h;
  } else if (method == "random"){
    float r = random(360);
//    println("Random hue: ", r);
    return r;
  }
  return float(0);
}

color get_color_from_palette(color[] colorlist){
  if(random(1) < .95){
    current_color = colorlist[(int) random(colorlist.length - 1)];
  }
  return current_color;
}

color[] generate_colors(int n){
  color[] cols = new color[n];
  for(int i = 0; i <n; i++){
    color c = color((float) i / (float) n * 360, 85, 100);
    println(hex(c));
    cols[i] = c;
  }
  return cols;
}

float get_saturation(float v1, float v2){
  return random(v1, v2);
}

float get_brightness(float v1, float v2){
  return random(v1, v2);
}

void keyPressed(){
  if (key == ' '){
    drawScreen();
    redraw();
  } else if (key == 's'){
    save_image();
  }
}

void save_image(){
  Date d = new Date();
  long current = d.getTime()/1000;
  String str = "images/img_" + current + ".png";
  saveFrame(str);
  println("Image saved as ", str);
}
