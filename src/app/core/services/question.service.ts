import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../interface/question';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private readonly httpClient: HttpClient) {}

  getAllQuestion(
    id: string
  ): Observable<{ message: string; questions: Question[] }> {
    return this.httpClient.get<{ message: string; questions: Question[] }>(
      `${environment.BASE_URL}/api/v1/questions?exam=${id}`
    );
  }
}
