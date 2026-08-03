import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, tap } from 'rxjs/operators';
import { QuestionService } from '../../Feature/Exam/Services/question.service';
import {
  loadQuestions,
  setCurrentQuestions,
  setQuestions,
} from './questions.action';

@Injectable()
export class questionsEffects {
  private readonly actions$ = inject(Actions);
  private readonly questionService = inject(QuestionService);

  loadQuestions = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadQuestions),
      switchMap((action) =>
        this.questionService.getQuestionByExamId(action.examId).pipe(
          tap((data) => console.log('questionData:', data)),
          map((data) => setQuestions({ question: data })),
        ),
      ),
    );
  });

  setQuestionEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setQuestions),
      map((action) => setCurrentQuestions({ question: action.question[0] })),
    ),
  );
}
