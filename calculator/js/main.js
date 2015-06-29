var CALCULATOR = CALCULATOR || {};

requirejs.config({
    paths: {
        'backbone': '../lib/backbone/backbone',
        'jquery': '../lib/jquery/dist/jquery',
        'calculator': 'apps/calculator/calculator',
        'underscore': '../lib/underscore/underscore',
        'transit': '../lib/transit-js/transit',
        'text': '../lib/requirejs-text/text'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            deps: ['jquery'],
            exports: '_'
        },
        'calculator': ['backbone', 'transit'],
        'transit': ['jquery']
    }
});

require(['calculator', 'transit'], function(Calculator) {
    CALCULATOR = Calculator;
    Calculator.init();
});

