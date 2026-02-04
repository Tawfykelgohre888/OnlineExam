import { Injectable } from '@angular/core';
import { Adapter } from '../interface/Adapter';
import { questionResponse, questionAdapter } from '../interface/question';

@Injectable({
  providedIn: 'root',
})
export class MainAdapter implements Adapter {
  questionAdaptor(data: questionResponse): questionAdapter[] {
    return data.questions.map((q, index) => {
      return {
        answers: q.answers,
        _id: q._id,
        index: index,
        question: q.question,
        correct: q.correct,
      };
    });
  }
}
