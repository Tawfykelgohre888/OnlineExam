import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetSubjectsResponse } from '../interface/get-subject';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  constructor(private readonly http: HttpClient) {}

  getSubject(): Observable<GetSubjectsResponse> {
    return this.http.get<GetSubjectsResponse>(
      `${environment.BASE_URL}/api/v1/subjects`
    );
  }
}
