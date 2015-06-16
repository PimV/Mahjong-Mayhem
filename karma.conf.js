var istanbul = require('browserify-istanbul');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon', 'browserify'],
    files: [
      'app/js/**/*.js',
      'node_modules/angular-mocks/angular-mocks.js',      
      'test/*.spec.js',
      'app/**/*.html'
    ],

    reporters: ['progress', 'coverage'],

    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'app/**/*.js': ['coverage', 'browserify'],
      'app/**/*.html': ['ng-html2js']
    },
    
    ngHtml2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'app/'
    },

    browserify: {
      debug: true,
      transform: [/*es6ify, brfs, 'browserify-shim',*/ istanbul({
        ignore: ['**/node_modules/**', '**/test/**'],
      })],
    },

    // optionally, configure the reporter
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    port: 9876,
    colors: true,
    autoWatch: true,
    singleRun: false,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,

    browsers: ['Chrome']

  });
};
