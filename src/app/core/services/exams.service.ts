import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootObject } from '../interface/exams';
@Injectable({
  providedIn: 'root'
})
export class ExamsService {

  constructor(private readonly http:HttpClient, ) { }

  getAllExamsBySubject (id:String):Observable<RootObject>{
    return this.http.get<RootObject>(`https://exam.elevateegy.com/api/v1/exams?subject=${id} `)
  }

}
