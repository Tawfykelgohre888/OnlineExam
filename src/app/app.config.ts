import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BASE_URL } from '../../projects/auth/src/lib/BASE_URL';
import { environment } from '../environment/environment';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes)
     , provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),

     {
    provide:BASE_URL,
    useValue:environment.BASE_URL
  },
  ]



};
