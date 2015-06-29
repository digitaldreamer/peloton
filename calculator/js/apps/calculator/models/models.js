define(['jquery', 'underscore', 'backbone'],
function($, _, Backbone) {
    var State = Backbone.Model.extend({
        defaults: {
        }
    });

    return {
        State: State
    };
});
