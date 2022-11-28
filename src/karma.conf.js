/** @type { import('karma').ConfigOptions } */
const configOptions = {
  basePath: '',
  frameworks: ['jasmine', '@angular-devkit/build-angular'],
  port: 9876,
  browsers: ['ChromeHeadless'],
};

/** @param { import('karma').Config } config  */
module.exports = function (config) {
  if (process.env['CI_TEST'] != null) {
    config.set({
      ...configOptions,
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-junit-reporter'),
        require('karma-coverage'),
        require('@angular-devkit/build-angular/plugins/karma'),
      ],
      autoWatch: false,
      singleRun: true,
      client: {
        captureConsole: false,
      },
      reporters: ['junit', 'coverage'],
      coverageReporter: {
        dir: '../coverage',
        subdir: '.',
        reporters: [{ type: 'html' }, { type: 'lcovonly' }, { type: 'cobertura' }],
        includeAllSources: true,
        fixWebpackSourcePaths: true,
        // check: {
        //   global: {
        //     statements: 50,
        //     branches: 50,
        //     functions: 50,
        //     lines: 50
        //   }
        // }
      },
      junitReporter: {
        outputDir: 'test-reports',
        suite: '',
      },
      colors: false,
      logLevel: config.LOG_WARN,
    });
  } else {
    config.set({
      ...configOptions,
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-jasmine-html-reporter'),
        require('@angular-devkit/build-angular/plugins/karma'),
      ],
      client: {
        clearContext: false,
      },
    });
  }
};
