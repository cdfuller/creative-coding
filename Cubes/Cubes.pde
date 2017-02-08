import java.util.Date;
float diameter=100;
int num=500, edge=0, rs, f, h=0;

void setup() {
  colorMode(HSB, 360, 100, 100);
  size(800, 800);
  background(#202020);
}

void draw() {
}

void mouseClicked() {
  background(20);
  f = (int) random(360);
  rs = (int) random(10000);
  for (int i=0; i<num; i++) {
    drawIsoCube();
  }
}

void keyPressed() {
  if( key == 's'){
    save_image();
  }
}

void drawIsoCube() {
//  f = (int) random(360); // Hue
  f = (int) get_hue("rainbow");
  int orgX, orgY;
  int[] x = new int[7];
  int[] y = new int[7];
  int w = int(cos(radians(30))*diameter);
  int h = int(sin(radians(30))*diameter);
  int rx = (int) random(width/diameter);
  int ry = (int) random(height/diameter);
  if (random(1)>.5) {
    orgX=rx*w*2;
    orgY=ry*h*2;
  } else {
    orgX=w+rx*w*2;
    orgY=(ry*h*2)+h;
  }
  if (orgX<edge || orgX>width-edge || orgY<edge || orgY>height-edge) {
  } else {
    x[0]=orgX;
    y[0]=orgY;
    x[1]= x[0];
    y[1]= int(y[0]+diameter);
    x[2]= int(x[1]-w);
    y[2]= int(y[1]-h);
    x[3]= x[2];
    y[3]= int(y[2]-diameter);
    x[4]= x[0];
    y[4]= int(y[0]-diameter);
    x[5]= int(x[0]+w);
    y[5]= int(y[0]-h);
    x[6]= x[5];
    y[6]= int(y[5]+diameter);
    stroke(#202020);
    noStroke();
    fill(f, 90, 60); // Left Triangle
    quad(x[0], y[0], x[1], y[1], x[2], y[2], x[3], y[3]);
    fill(f, 90, 90); // Top Triangle
    quad(x[0], y[0], x[3], y[3], x[4], y[4], x[5], y[5]);
    fill(f, 90, 40); // Bottom Triangle
    quad(x[0], y[0], x[5], y[5], x[6], y[6], x[1], y[1]);
  }
}


void save_image(){
  Date d = new Date();
  long current = d.getTime()/1000;
  String str = "images/img_" + current + ".png";
  saveFrame(str);
  println("Image saved as ", str);
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
  } else {
    println("Invalid argument: ", method);
  }
  return float(0);
}