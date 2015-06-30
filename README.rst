#######
PELOTON
#######

INITIALIZE
##########

The project requires node, npm, and bower to be installed to set up the project.

To start run bower in the project root directory to intall `/calculator/lib`

::

    bower install

The root html directory is `/calculator` (containes index.html)


STRUCTURE
#########

This project is built with Backbone and jQuery.

Less is used as the CSS precompiler. LessHat is used to help with x-browser compatibility.

Underscore templates is the template engine.

The dependencies are loaded and managed with RequireJS.

Transit was included to provide css3 javascript animation support but in the end it wasn't needed as I was able to accomplish what I wanted strictly through CSS class manipulation.

I did not use a CSS framework like Bootstrap because I felt it was overkill for this assignment, however most of my projects use Bootstrap Grids for responsiveness.
