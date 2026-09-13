import { Observable } from 'rxjs';

export abstract class autApi {
  abstract LOGIN(data: any): Observable<any>;
  abstract REGISTER(data: any): Observable<any>;
  abstract FORGETPASSWORD(data: any): Observable<any>;
  abstract RESETPASSWORD(data: any): Observable<any>;
}
