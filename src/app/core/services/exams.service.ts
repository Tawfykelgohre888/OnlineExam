import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootObject } from '../interface/exams';
import { environment } from '../../shared/environment/environment';
@Injectable({
  providedIn: 'root',
})
export class ExamsService {
  constructor(private readonly http: HttpClient) {}

  getAllExamsBySubject(id: String): Observable<RootObject> {
    return this.http.get<RootObject>(
      `${environment.BASE_URL}/api/v1/exams?subject=${id} `
    );
  }
}
