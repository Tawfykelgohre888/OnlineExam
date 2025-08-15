import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
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
import { environment } from '../environment/environment';
import { BASEURL } from '../../projects/auth/src/lib/base-url';
import { headersInterceptor } from './core/Interceptor/headers/headers.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { NgxSpinnerModule } from "ngx-spinner";
import { lodingInterceptor } from './core/Interceptor/loding/loding.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([headersInterceptor,lodingInterceptor])),
    provideAnimations(),
    provideAnimationsAsync(),
    provideToastr(),
    importProvidersFrom(NgxSpinnerModule),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    {
      provide: BASEURL,
      useValue: environment.BASE_URL,
    },
  ],
};
