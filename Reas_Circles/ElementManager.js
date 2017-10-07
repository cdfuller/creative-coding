function ElementManager(count) {
  var elements = [];

  for (var i = 0; i < count; i++){
    elements[i] = new Element(random(width, random(height)));
  }
}

ElementManager.display = function(){
  for (var i = 0; i < this.elements.length; i++){
    elements[i] = elements[i].display();
  }
}

ElementManager.update = function(){
  for (var i = 0; i < this.elements.length; i++){
    elements[i] = elements[i].checkEdges();
    for (var j = i + 1; j < this.elements.length; j++){
      if (elements[i].intersects(elements[j])) {
        elements[i].fleeFrom(elements[j]);
        elements[j].fleeFrom(elements[i]);
        // this.drawConnectingLine(locA, locB);
      }
    }
  }
}