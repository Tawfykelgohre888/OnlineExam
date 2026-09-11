import { inject, Injectable, signal } from '@angular/core';
import { autApi } from './base/authApi';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { authEndPoint } from './enums/endPoindApt';
import { AuthApiAdaptorService } from './adaptor/auth-api-adaptor.service';
import { BASEURL } from './base-url';
import { login } from './interfaces/loginInterface';
import { CHANGEPASSWORD } from './interfaces/changePassword';
import { forgetPassword } from './interfaces/forgetPassword';
import { restCode } from './interfaces/resteCode';
import { RESETPASSWORD } from './interfaces/restePassword';
import { SIGNUP } from './interfaces/registerInterfae';
import { general } from './interfaces/genralAdptor';
import { LoginRegisterResponse } from './interfaces/backAdapt';
import { ChangePasswordResponse } from './interfaces/ChangePasswordResponse';
import { forgetPasswordResponse } from './interfaces/forgetPasswordResponse';
import { verifyResetCodeResponse } from './interfaces/verifyResetCodeResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements autApi {
  _httpClient = inject(HttpClient);
  _baseUrl = inject(BASEURL);
  _authApiAdaptorService = inject(AuthApiAdaptorService);
  userEmail = signal<string>('');
  isEmailVerified = signal<boolean>(false);

  sendEmailVerification(email: any): Observable<any> {
    return this._httpClient
      .post(this._baseUrl + authEndPoint.sendEmailVerification, { email })
      .pipe(tap(() => this.userEmail.set(email)));
  }
  confirmEmailVerification(code: any): Observable<any> {
    return this._httpClient
      .post(this._baseUrl + authEndPoint.isEmailVerified, {
        email: this.userEmail(),
        code: code,
      })
      .pipe(tap(() => this.isEmailVerified.set(true)));
  }

  REGISTER(data: SIGNUP): Observable<general> {
    return this._httpClient
      .post<LoginRegisterResponse>(this._baseUrl + authEndPoint.SIGNUP, data)
      .pipe(
        map((res) => this._authApiAdaptorService.adapt(res)),
        catchError((err) => of(err)),
      );
  }

  LOGIN(data: login): Observable<general> {
    return this._httpClient
      .post<LoginRegisterResponse>(this._baseUrl + authEndPoint.SIGNIN, data)
      .pipe(map((res) => this._authApiAdaptorService.adapt(res)));
  }
  CHANGEPASSWORD(data: CHANGEPASSWORD): Observable<ChangePasswordResponse> {
    return this._httpClient
      .patch<ChangePasswordResponse>(
        this._baseUrl + authEndPoint.CHANGEPASSWORD,
        data,
      )
      .pipe(
        map((res: ChangePasswordResponse) =>
          this._authApiAdaptorService.adaptorChangePasowrd(res),
        ),
        catchError((err) => of(err)),
      );
  }

  FORGETPASSWORD(data: forgetPassword): Observable<forgetPasswordResponse> {
    return this._httpClient
      .post<forgetPasswordResponse>(
        this._baseUrl + authEndPoint.FORGETPASSWORD,
        data,
      )
      .pipe(
        map((res: forgetPasswordResponse) =>
          this._authApiAdaptorService.adaptSendOtp(res),
        ),
        catchError((err) => of(err)),
      );
  }

  VERIFYRESETCODE(data: restCode): Observable<verifyResetCodeResponse> {
    return this._httpClient
      .post<verifyResetCodeResponse>(
        this._baseUrl + authEndPoint.VERIFYRESETCODE,
        data,
      )
      .pipe(
        map((res) => this._authApiAdaptorService.adaptverifyResetCode(res)),
        catchError((err) => of(err)),
      );
  }

  RESETPASSWORD(data: RESETPASSWORD): Observable<verifyResetCodeResponse> {
    return this._httpClient
      .put<verifyResetCodeResponse>(
        this._baseUrl + authEndPoint.RESETPASSWORD,
        data,
      )
      .pipe(
        map((res) => this._authApiAdaptorService.adaptverifyResetCode(res)),
        catchError((err) => of(err)),
      );
  }
}
