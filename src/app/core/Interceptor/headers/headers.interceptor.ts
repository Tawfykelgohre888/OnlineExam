import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const PLATFORM = inject(PLATFORM_ID);

  if (isPlatformBrowser(PLATFORM)) {
    const token = localStorage.getItem('userToken');

    if (token) { // ✅ اتأكد إن في توكن
      req = req.clone({
        setHeaders: {
          token: token
        }
      });
    }
  }

  return next(req);
};
