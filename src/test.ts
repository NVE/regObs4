// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { NanoSql } from './nanosql';

declare const require: any;

// First, initialize the Angular testing environment.

// Second arg is the nanosql database mode to use.
// LS is Local Storage.
// We previously used TEMP which is an in memory database, but the in-memory database returns immutable data,
// and caused some tests to fail.
// See https://github.com/only-cliches/Nano-SQL/blob/af74705e3fc4be6e65c0e4044f7dc7c5b745886c/website/src/adapters/built-in-adapters.md#built-in-adapters
NanoSql.init('test-db', 'LS').then(() => {
  getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
    teardown: { destroyAfterEach: false },
  });
  // Then we find all the tests.
  const context = require.context('./', true, /\.spec\.ts$/);
  // And load the modules.
  context.keys().map(context);
});
