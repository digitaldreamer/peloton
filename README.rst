#######
PELOTON
#######


INITIALIZE
##########

The project requires node, npm, and bower to set up the project. The RequireJS npm packege is needed to build the github pages site.

To initialize run bower in the project root directory to intall dependencies into `/calculator/lib`

::

    bower install

The root html directory is `/calculator` (containes index.html)

`/js/main.js` is the main file loaded which initializes the calculator.


BUILD
#####

To build the site you need to be in the master branch and run the make command::

    make build


DEPLOYMENT
##########

To deploy you first need to run build in the master branch. You can then run the make site command to load the project into the gh-pages branch after which you should commit and push the updates to deploy the site::

    make site
    git add --all .
    git commit -am 'updates'
    git push


NOTES
#####

This project is built with Backbone and jQuery.

Less is used as the CSS precompiler. LessHat is used to help with x-browser compatibility.

Underscore templates is the template engine.

The dependencies are loaded and managed with RequireJS.

I use Modernizr to check for HTML5 audo support.

Transit is included to provide css3 javascript animation support but in the end it wasn't needed as I was able to accomplish what I wanted strictly through CSS class manipulation.

I did not use a CSS framework like Bootstrap because I felt it was overkill for this assignment, however most of my projects use Bootstrap Grids for responsiveness.

I enjoyed working on this, and thank you for your time!
