import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  MultiTranslateHttpLoader,
  provideTranslateService,
  TranslateLoader,
} from '@bravo-extensions/translate';
import { BravoStringExtensions } from '@bravo-infra/core/utils/data-extensions';
import { provideFocusControl } from '@bravo-infra/ui/cdk/tokens-provider';
import { shellRoutes } from './app.routes';

export function HttpLoaderFactory(pHttpClient: HttpClient) {
  return new MultiTranslateHttpLoader(pHttpClient, [
    { prefix: '/assets/ui/i18n/', suffix: '.json' }, // Lib
    { prefix: '/assets/i18n/', suffix: '.json' }, //App
  ]);
}

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },

    provideRouter(shellRoutes),
    provideHttpClient(),
    provideHttpClient(),

    provideFocusControl(),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      extend: true,
      formatEngine: BravoStringExtensions.format.bind(BravoStringExtensions),
    }),
  ],
};
