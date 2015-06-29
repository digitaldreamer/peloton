define(['jquery',
        'underscore',
        'backbone',
        'apps/calculator/models/models',
        'apps/calculator/views/views'
],
function($, _, Backbone, Models, Views) {
    var Calculator = new function() {
        var that = this;

        this.init = function() {
            console.log('init calculator');

            var state = new Models.State();
            var calculatorTemplate = new Views.Calculator({el: '#calculator', model: state});
        } // init
    }

    return Calculator;
});

