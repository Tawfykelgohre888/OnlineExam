import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { AuthEndpoint } from './enum/authEndPoint';
import { AuthApiAdaptorService } from './adapor/auth-api-adaptor.service';
import { authApi } from './base/authApi';

@Injectable({
  providedIn: 'root'
})
export class AuthService  implements authApi {

  constructor() { }
  _httpClient= inject(HttpClient)
  _authApiAdaptorService = inject(AuthApiAdaptorService)

  login(data:any):Observable<any>{
    return this._httpClient.post(AuthEndpoint.SIGNIN,data)
    .pipe(map((res => this._authApiAdaptorService.adapt(res)),
    catchError(err => err)
  ))
  }
}
