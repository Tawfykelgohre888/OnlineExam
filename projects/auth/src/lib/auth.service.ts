import { inject, Injectable } from '@angular/core';
import { autApi } from './base/authApi';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { authEndPoint } from './enums/endPoindApt';
import { AuthApiAdaptorService } from './adaptor/auth-api-adaptor.service';
import { BASEURL } from './base-url';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements autApi {
  _httpClient = inject(HttpClient);
  _baseUrl = inject(BASEURL)

  _authApiAdaptorService = inject(AuthApiAdaptorService)

   LOGIN(data: any): Observable<any> {
    return this._httpClient.post(this._baseUrl + authEndPoint.SIGNIN,data)
    .pipe(
      map(res => this._authApiAdaptorService.adapt(res),
      catchError(err => of(err))
    ))
  }


 REGISTER(data: any): Observable<any> {
  return  this._httpClient.post(this._baseUrl + authEndPoint.SIGNUP,data)
  .pipe(
    map(res => this._authApiAdaptorService.adapt(res)),
    catchError(err => of(err))
  )
  }


   CHANGEPASSWORD(data: any): Observable<any> {
    return this._httpClient.post(this._baseUrl + authEndPoint.CHANGEPASSWORD,data)
    .pipe(
      map(res=> this._authApiAdaptorService.adapt(res) ),
      catchError(err => of(err) )
    )
  }


   FORGETPASSWORD(data: any): Observable<any> {
    return this._httpClient.post(this._baseUrl  + authEndPoint.FORGETPASSWORD,data)
    .pipe(
      map(res => this._authApiAdaptorService.adapt(res)),
      catchError(err => of(err))
    )
  }
}
