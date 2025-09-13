import { inject, Injectable } from '@angular/core';
import { autApi } from './base/authApi';
import { catchError, map, Observable, of } from 'rxjs';
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

@Injectable({
  providedIn: 'root',
})
export class AuthService implements autApi {
  _httpClient = inject(HttpClient);
  _baseUrl = inject(BASEURL);

  _authApiAdaptorService = inject(AuthApiAdaptorService);

  LOGIN(data: login): Observable<login> {
    return this._httpClient
      .post<login>(this._baseUrl + authEndPoint.SIGNIN, data)
      .pipe(
        map((res) => this._authApiAdaptorService.adapt(res)),
        catchError((err) => of(err))
      );
  }

  REGISTER(data: SIGNUP): Observable<SIGNUP> {
    return this._httpClient
      .post(this._baseUrl + authEndPoint.SIGNUP, data)
      .pipe(
        map((res) => this._authApiAdaptorService.adapt(res)),
        catchError((err) => of(err))
      );
  }

  CHANGEPASSWORD(data: CHANGEPASSWORD): Observable<CHANGEPASSWORD> {
    return this._httpClient
      .patch(this._baseUrl + authEndPoint.CHANGEPASSWORD, data)
      .pipe(
        map((res) => this._authApiAdaptorService.adapt(res)),
        catchError((err) => of(err))
      );
  }

  FORGETPASSWORD(data: forgetPassword): Observable<forgetPassword> {
    return this._httpClient
      .post(this._baseUrl + authEndPoint.FORGETPASSWORD, data)
      .pipe(
        map((res) => this._authApiAdaptorService.adapt(res)),
        catchError((err) => of(err))
      );
  }

  VERIFYRESETCODE(data: restCode): Observable<restCode> {
    return this._httpClient
      .post(this._baseUrl + authEndPoint.VERIFYRESETCODE, data)
      .pipe(
        map((res) => this._authApiAdaptorService.adapt(res)),
        catchError((err) => of(err))
      );
  }

  RESETPASSWORD(data: RESETPASSWORD): Observable<RESETPASSWORD> {
    return this._httpClient
      .put(this._baseUrl + authEndPoint.RESETPASSWORD, data)
      .pipe(
        map((res) => this._authApiAdaptorService.adapt(res)),
        catchError((err) => of(err))
      );
  }
}
