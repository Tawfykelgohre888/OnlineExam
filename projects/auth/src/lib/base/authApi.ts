import { Observable } from "rxjs";

export abstract class autApi{
  abstract LOGIN(data:any):Observable<any>;

  abstract REGISTER(data:any):Observable<any>;


  abstract CHANGEPASSWORD(data:any):Observable<any>


  abstract FORGETPASSWORD(data:any):Observable<any>

}
