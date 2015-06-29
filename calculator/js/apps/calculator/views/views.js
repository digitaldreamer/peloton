define(['jquery', 'underscore', 'backbone',
    'text!apps/calculator/templates/calculator.html'
],
function($, _, Backbone,
    calculatorTemplate
) {
    var Calculator = Backbone.View.extend({
        initialize: function() {
            _.bindAll(this, 'onClickKey');
            this.render();
        },
        events: {
            'click .key': 'onClickKey'
        },
        onClickKey: function(event) {
            event.preventDefault();
            var self = this;
            var $el = $(event.currentTarget);

            $el.addClass('active');

            setTimeout(function() {
                $el.removeClass('active');
            }, 200);
        },
        render: function() {
            var template = _.template(calculatorTemplate);
            this.$el.append(template());
        }
    });

    return {
        Calculator: Calculator
    };
});
