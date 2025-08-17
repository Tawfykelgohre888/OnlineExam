import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../interface/question';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private readonly httpClient: HttpClient) {}

  getAllQuestion(id: string): Observable<{ message: string; questions: Question[] }> {
    return this.httpClient.get<{ message: string; questions: Question[] }>(`https://exam.elevateegy.com/api/v1/questions?exam=${id}`);
  }
}
