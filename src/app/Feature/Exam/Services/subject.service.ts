import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../shared/environment/environment';
import { question } from '../../../shared/endpoint';
import { subjects } from '../../Exam/interface/get-subject';
@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  constructor(private readonly http: HttpClient) {}

  getSubject(): Observable<subjects> {
    return this.http.get<subjects>(
      `${environment.BASE_URL}${question.diploma}`,
    );
  }
}
