import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'hammerjs';
import { NanoSql } from './nanosql';

if (environment.production) {
  enableProdMode();
}

document.addEventListener(typeof cordova !== 'undefined' ? 'deviceready' : 'DOMContentLoaded', () => {
  NanoSql.init().then(() => platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err)));
});
