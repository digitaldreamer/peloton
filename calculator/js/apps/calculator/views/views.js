define(['jquery', 'underscore', 'backbone',
    'text!apps/calculator/templates/calculator.html',
    'text!apps/calculator/templates/message.html',
    'text!apps/calculator/templates/results.html'
],
function($, _, Backbone,
    calculatorTemplate,
    messageTemplate,
    resultsTemplate
) {
    var Calculator = Backbone.View.extend({
        initialize: function() {
            _.bindAll(this, 'onClickKeyCalculate', 'onClickKeyInput', 'onClickKeyReset');
            this.render();
        },
        events: {
            'click .key.calculate': 'onClickKeyCalculate',
            'click .key.reset': 'onClickKeyReset',
            'click .key.input': 'onClickKeyInput'
        },
        onClickKeyCalculate: function(event) {
            event.preventDefault();
            var $el = $(event.currentTarget);

            this.animateButton($el);
            this.model.calculate();
        },
        onClickKeyInput: function(event) {
            event.preventDefault();
            var $el = $(event.currentTarget);
            var key = $el.attr('href');

            this.animateButton($el);
            this.model.addInput(key);
        },
        onClickKeyReset: function(event) {
            event.preventDefault();
            var $el = $(event.currentTarget);

            this.animateButton($el);
            this.model.reset();
        },
        animateButton($el) {
            // activate the button press animation
            // this could alternatively start on mousedown,
            // but for this demo the animation doesn't register until mouseup
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

    var Message = Backbone.View.extend({
        initialize: function() {
            _.bindAll(this, 'onStateChange');

            this.render();
            this.model.on('change:state', this.onStateChange);
            this.model.on('change:inputs', this.onStateChange);
        },
        onStateChange: function() {
            this.render();
        },
        render: function() {
            var template = _.template(messageTemplate);
            this.$el.html(template({
                state: this.model.get('state'),
                inputs: this.model.get('inputs'),
            }));
        }
    });

    var Results = Backbone.View.extend({
        initialize: function() {
            this.render();
        },
        render: function() {
            var template = _.template(resultsTemplate);
            this.$el.append(template());
        }
    });

    return {
        Calculator: Calculator,
        Message: Message,
        Results: Results
    };
});
