import java.util.Date;
int side_length = 60;
int line_weight = 30;

void setup(){
  size(1000, 1000);
  colorMode(HSB, 360, 100, 100);
  background(201, 100, 34);
  strokeCap(ROUND);
}

void draw(){

  drawScreen();
  noLoop();

}


void drawScreen(){
  background(201, 100, 34);
  for(int i=0; i<width; i+=side_length){
    for(int j=0; j<height; j+=side_length){
      draw_diagonal_line(i, j, side_length);
    }
  } 
}

void draw_line(float x, float y, float square_size){
  strokeWeight(line_weight);
  stroke(0, 0, 100);

  if(random(100) < 50){
    line(x+(square_size/2), y, x+(square_size/2), y+square_size+1);
    if(random(100) < 50){
      line(x+(square_size/2), y+(square_size/2), x-1, y+(square_size/2));
    } else {
      line(x+(square_size/2), y+(square_size/2), x+square_size+1, y+(square_size/2));
    }
  } else {
    line(x, y+(square_size/2), x+square_size+1, y+(square_size/2));
  }
}

void draw_diagonal_line(float x, float y, float square_size){
  strokeWeight(line_weight);
  stroke(0, 0, 100);
  if(random(100) > 10){
    if(random(100) < 50){
      line(x, y, x+square_size, y+square_size);
    } else {
      line(x, y+square_size, x+square_size, y);
    }
  }
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