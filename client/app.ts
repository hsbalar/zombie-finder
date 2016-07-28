import './assets/styles/app.scss';

import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { environment } from './app/environment';

import { ServiceApp } from './app/service-app';

if (environment.production) {
  enableProdMode();
}

bootstrap(ServiceApp)
  .catch(err => console.error(err));
