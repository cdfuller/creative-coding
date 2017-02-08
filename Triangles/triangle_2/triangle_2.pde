import java.util.Date;
float triangle_side_length = 50;
float triangle_height = sqrt(sq(triangle_side_length) - sq(triangle_side_length / 2));

PImage img;

void setup(){
  size(1000, 1000);
  background(0);
  colorMode(HSB, 360, 100, 100);
  img = loadImage("input/flag.jpg");
}

void draw(){
  noStroke();
  drawScreen();
  noLoop();
}



void drawScreen(){
  for(int x=(int)-triangle_side_length/2; x < width; x+=triangle_side_length - 1){
    for(int y=0; y < height + triangle_height; y+= triangle_height - 1){
      int inputX = constrain((int) map(x, 0, width, 0, img.width), 0, img.width-10);
      int inputY = constrain((int) map(y, 0, height, 0, img.height), 0, img.height-10);
      
      int random_distance = 100;
      int random_offset = (int) random(-random_distance, random_distance);

      if(inputX + random_offset < 0 || inputX + random_offset > img.width){
        inputX += -random_offset;
      }
      if(inputY + random_offset < 0 || inputY + random_offset > img.height){
        inputY += -random_offset;
      }     
      color c = img.get(inputX, inputY);
      float ch = hue(c) + random(-50,50);
      float cs = saturation(c) + 20;
      float cb = brightness(c);     
      
      fill(ch, cs, cb);
      equilateral_triangle(x, y, "up");
    }
    for(int y=0; y < height + triangle_height; y+= triangle_height - 1){
      int inputX = constrain((int) map(x, 0, width, 0, img.width), 0, img.width-10);
      int inputY = constrain((int) map(y, 0, height, 0, img.height), 0, img.height-10);
      
      int random_distance = 100;
      int random_offset = (int) random(-random_distance, random_distance);

      if(inputX + random_offset < 0 || inputX + random_offset > img.width){
        inputX += -random_offset;
      }
      if(inputY + random_offset < 0 || inputY + random_offset > img.height){
        inputY += -random_offset;
      }
      
      color c = img.get(inputX, inputY);
      float ch = hue(c) + random(-50,50);
      float cs = saturation(c) + 20;
      float cb = brightness(c);     
      
      fill(ch, cs, cb);
      equilateral_triangle(x + triangle_side_length / 2, y, "down");
    }
  }
}

void equilateral_triangle(float x, float y, String direction){
  
  float x2 = x + triangle_side_length;
  float x3 = x + (triangle_side_length / 2);
  float y3;
  
  if( direction == "up"){
    y3 = y - triangle_height + 1;
  } else if ( direction == "down"){
    y3 = y + triangle_height - 1;
  } else {
    y3 = 0;
  }
  triangle(x, y, x2, y, x3, y3);
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
  String str = "images/img_" + current + ".jpg";
  saveFrame(str);
  println("Image saved as ", str);
}
