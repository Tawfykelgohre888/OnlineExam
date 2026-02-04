import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { openModal } from './modal.action';
import { map } from 'rxjs';
import { loadQuestions } from '../questions/questions.action';

@Injectable()
export class modalEffects {
  private readonly actions$ = inject(Actions);

  startModalStart = createEffect(() => {
    return this.actions$.pipe(
      ofType(openModal),
      map((action) => loadQuestions({ examId: action.examId })),
    );
  });
}
