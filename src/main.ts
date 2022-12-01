/* eslint-disable no-console */
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { NanoSql } from './nanosql';
import '@angular/compiler';

if (environment.production) {
  enableProdMode();
}

function startApp() {
  console.log('starting app');
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.log(err));
}

document.addEventListener(typeof cordova !== 'undefined' ? 'deviceready' : 'DOMContentLoaded', async () => {
  console.log('Init NanoSql database');
  try {
    await NanoSql.init();
    startApp();
  } catch (err) {
    console.error('Error init NanoSql database', err);
    startApp(); // Try to start app anyway
  }
});
