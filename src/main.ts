import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

/* if (environment.production) {
  enableProdMode();
} */
enableProdMode();

// platformBrowserDynamic().bootstrapModule(AppModule);
platformBrowserDynamic().bootstrapModule(AppModule, {
  preserveWhitespaces: true
})
.catch(err => console.log(err));
