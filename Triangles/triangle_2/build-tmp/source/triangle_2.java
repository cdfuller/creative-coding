import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import java.util.Date; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class triangle_2 extends PApplet {


float triangle_side_length = 50;
float triangle_height = sqrt(sq(triangle_side_length) - sq(triangle_side_length / 2));

PImage img;

public void setup(){
  size(3840, 1080);
  background(0);
  colorMode(HSB, 360, 100, 100);
  img = loadImage("input/img_1415520112.png");
}

public void draw(){
  noStroke();
  drawScreen();
  noLoop();
}



public void drawScreen(){
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
      int c = img.get(inputX, inputY);
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
      
      int c = img.get(inputX, inputY);
      float ch = hue(c) + random(-50,50);
      float cs = saturation(c) + 20;
      float cb = brightness(c);     
      
      fill(ch, cs, cb);
      equilateral_triangle(x + triangle_side_length / 2, y, "down");
    }
  }
}

public void equilateral_triangle(float x, float y, String direction){
  
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


public void keyPressed(){
  if (key == ' '){
    drawScreen();
    redraw();
  } else if (key == 's'){
    save_image();
  }
}

public void save_image(){
  Date d = new Date();
  long current = d.getTime()/1000;
  String str = "images/img_" + current + ".png";
  saveFrame(str);
  println("Image saved as ", str);
}
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "triangle_2" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
