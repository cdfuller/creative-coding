PImage img;
PImage sorted;
int index = 0;

void setup() {
   size(640, 427);
   img = loadImage("images/dutch_landscape.jpg");
   sorted = createImage(img.width, img.height, RGB);
   //sorted.loadPixels();
   //for(int i = 0; i < sorted.pixels.length; i++){
   //  sorted.pixels[i] = color(random(255)); 
   //}
   sorted = img.get();
   sorted.loadPixels();
}

void draw() {
  println(frameRate);
  
  for (int n = 0; n < 100; n ++){
    float record = -1;
    int selectedPixel = index;
    for (int j = index; j < sorted.pixels.length; j++){
      color pix = sorted.pixels[j];
      float b = hue(pix);
      
      if (b > record){
        selectedPixel = j;
        record = b;
      }
    }
    // Swap
    color temp = sorted.pixels[index];
    sorted.pixels[index] = sorted.pixels[selectedPixel];
    sorted.pixels[selectedPixel] = temp;
    
    if (index < sorted.pixels.length - 1){
      index++;
    }
     
    sorted.updatePixels();
    //image(img, 0, 0);
    image(sorted, 0, 0);
  }
  if (index > sorted.pixels.length){
    noLoop();
  }
}