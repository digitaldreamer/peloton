define(['jquery',
        'underscore',
        'backbone',
        'apps/calculator/models/models',
        'apps/calculator/views/views'
],
function($, _, Backbone, Models, Views) {
    var Calculator = new function() {
        // the main calculator singleton object
        var that = this;

        var init = function() {
            console.log('init calculator');

            // models
            var state = new Models.State();

            // views
            var calculatorView = new Views.Calculator({el: '#calculator', model: state});
            var messageView = new Views.Message({el: '#message', model: state});
            var resultsView = new Views.Results({el: '#results', model: state});
            var headerView = new Views.Header({el: 'header', model: state});

            // attatch these objects to the Calculator
            this.state = state;
            this.views = {
                calculator: calculatorView,
                header: headerView,
                message: messageView,
                results: resultsView
            }
        } // init

        // expose the following
        this.init = init;
    }

    return Calculator;
});

