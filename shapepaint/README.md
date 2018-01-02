# ShapePaint

* Canvas prepopulated with triangles where you can manually change the hue and/or color properties of individual triangles.
	* Could use an eye-dropper mechanism for setting colors.
	* Can also load images
	* Look into programmatically tesselating different shapes.

TODO:

Right now the triangles are only pointing one direction. Need to read up on tesselation techniques.

Create a Shape class and then a Triangle subclass? Maybe two triangle subclasses depending on orientation? Seems like a bad idea though. One shape should be able to tesselate with itself.

Thoughts:

To calculate the triangle I could use parametric equations to find the location of the corners
