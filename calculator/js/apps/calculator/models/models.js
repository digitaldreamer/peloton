define(['jquery', 'underscore', 'backbone'],
function($, _, Backbone) {
    var State = Backbone.Model.extend({
        defaults: {
            state: 'start',
            combinations: [],  // the calculated outcome from the choices
            inputs: []  // records the user's choices
        },
        initialize: function() {
            _.bindAll(this, 'onChange');
            var self = this;

            this.KEY_CHAR_MAP = {
                '0': '',
                '1': '',
                '2': 'abc',
                '3': 'def',
                '4': 'ghi',
                '5': 'jkl',
                '6': 'mno',
                '7': 'pqrs',
                '8': 'tuv',
                '9': 'wxyz'
            };

            this.on('change:inputs', this.onChange);
            this.on('change:combinations', this.onChange);
        },
        addInput: function(input) {
            // add an input
            //
            // use this instead of modifying the array in the model to trigger the change event
            var inputs = this.get('inputs');

            // soft limit
            // this algorithm can overload as it's O(n!)
            // also, don't let inputs be added if we've already computed the restults
            if (inputs.length >= 7 || this.get('state') === 'results') {
                return;
            }

            // only save valid inputs
            if (input in this.KEY_CHAR_MAP) {
                inputs.push(input);
                this.set({inputs: inputs});

                // manually trigger change event
                this.trigger('change:inputs');
            }
        },
        calculate: function() {
            // calculate combinations from the inputs
            var combinations = [];
            var inputs = this.get('inputs');
            var mappedInputs = [];

            // compile the mapped keys to their choices
            for (var i=0; i<inputs.length; i++) {
                // only add keys that actually have choices
                var choices = this.KEY_CHAR_MAP[inputs[i]];

                if (choices.length) {
                    mappedInputs.push(choices);
                }
            }

            // compute if we have at least one input
            if (mappedInputs.length) {
                combinations = this.getCombinations([], mappedInputs);
            }

            this.set({combinations: combinations});
            return combinations;
        },
        getCombinations: function(combinations, inputs) {
            // recursive call to calculate the possible combinations
            //
            // combinations: array of all found combinations
            // inputs: the array of inputs left to process
            var first = inputs[0];
            var second = inputs.slice(1);
            var newCombinations = [];

            if (combinations.length) {
                // if we have combinations add the next input set to the possibilities
                for(var i=0; i<combinations.length; i++) {
                    for(var j=0; j<first.length; j++) {
                        newCombinations.push(combinations[i] + first[j]);
                    }
                }
            } else {
                // no combinations exist so add the first input set as the only possibility
                for(var k=0; k<first.length; k++) {
                    newCombinations.push(first[k]);
                }
            }

            if (inputs.length === 1) {
                // we are done processing so return the results
                return newCombinations;
            } else {
                // we need to process the inputs again to add more possibilities
                return this.getCombinations(newCombinations, second);
            }
        },
        onChange: function() {
            // calculate the state on change
            var state = '';

            if (this.attributes.combinations.length) {
                state = 'results';
            } else if (this.attributes.inputs.length) {
                state = 'compute';
            } else {
                state = 'start';
            }

            this.set({state: state});
        },
        reset: function() {
            // reset the state
            this.set({
                state: 'start',
                combinations: [],
                inputs: []
            });
        }
    });

    return {
        State: State
    };
});
