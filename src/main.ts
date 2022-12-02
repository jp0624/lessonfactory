import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {enableProdMode} from '@angular/core';

// if (environment.production) {
//   enableProdMode();
//   console.log = function () {
//     return false;
//   };
//   console.warn = function () {
//     return false;
//   };
//   console.error = function () {
//     return false;
//   };
// }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
