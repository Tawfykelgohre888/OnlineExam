import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetSubjectsResponse, Subject } from '../interface/get-subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private readonly http:HttpClient ) { }


  getSubject():Observable<GetSubjectsResponse>{
    return this.http.get<GetSubjectsResponse>(`https://exam.elevateegy.com/api/v1/subjects`)
  }
}
