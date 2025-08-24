import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);

  return next(req).pipe(
    catchError((err) => {
      // Normalize error message to string
      const errorMessage: string =
        String(err?.error?.message) ||
        err?.message?.toString() ||
        'Something went wrong. Please try again later.';

      console.error('HTTP Error:', err);
      toastrService.error(errorMessage, 'Online Exam');

      return throwError(() => err);
    })
  );
};
