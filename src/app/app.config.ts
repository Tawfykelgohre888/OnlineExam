import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { environment } from './shared/environment/environment';
import { headersInterceptor } from './core/Interceptor/headers/headers.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { lodingInterceptor } from './core/Interceptor/loding/loding.interceptor';
import { errorInterceptor } from './core/Interceptor/error/error.interceptor';

import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BASEURL } from '../../projects/auth/src/public-api';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    MessageService,
    ConfirmationService,
    provideHttpClient(
      withFetch(),
      withInterceptors([
        headersInterceptor,
        lodingInterceptor,
        errorInterceptor,
      ]),
    ),
    provideAnimations(),
    provideAnimationsAsync(),
    provideToastr(),

    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    {
      provide: BASEURL,
      useValue: environment.BASE_URL,
    },

    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json',
      }),
      fallbackLang: 'en',
      lang: 'en',
    }),
  ],
};
