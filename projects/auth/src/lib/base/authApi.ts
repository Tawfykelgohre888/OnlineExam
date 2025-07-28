import { Observable } from "rxjs";




export abstract class authApi {
  constructor() {}


  abstract login(data:any):Observable<any>

  
}
