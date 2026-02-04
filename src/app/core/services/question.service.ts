import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../shared/environment/environment';
import { questionResponse } from '../interface/question';
import * as questionByExam from '../../shared/endpoint';
import { map } from 'rxjs';
import { MainAdapter } from '../adaptor/mainAdapt';
@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly adaptor: MainAdapter
  ) {}

  getQuestionByExamId(examId: string) {
    return this.httpClient
      .get<questionResponse>(
        `${environment.BASE_URL}` + questionByExam.question.questionByExam + examId
      )
      .pipe(map((res: questionResponse) => this.adaptor.questionAdaptor(res)));
  }
}
