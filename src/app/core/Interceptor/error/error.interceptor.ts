import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);

  return next(req).pipe(
    catchError((err) => {
      // logic erroe

      let errorMessage = err?.error?.message || err?.message;

      console.log(errorMessage);
      if (!errorMessage) {
        errorMessage = 'Something went wrong. Please try again later.';
      }

      toastrService.error(errorMessage, 'Online Exam');
      return throwError(() => err);
    })
  );
};
