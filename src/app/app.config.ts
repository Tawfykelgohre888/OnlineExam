import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { environment } from '../environment/environment';
import { BASEURL } from '../../projects/auth/src/lib/base-url';
import { headersInterceptor } from './core/Interceptor/headers/headers.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes)
     ,provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(),withInterceptors([headersInterceptor])),
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
    {
      provide:BASEURL,
      useValue:environment.BASE_URL
    }



  ]
};
