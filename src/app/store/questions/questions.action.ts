import { createAction, props } from '@ngrx/store';
import { questionAdapter } from '../../core/interface/question';

export const loadQuestions = createAction(
  '[questions] load questions',
  props<{ examId: string }>()
);

export const setQuestions = createAction(
  '[questions] set questions',
  props<{ question: questionAdapter[] }>()
);

export const setCurrentQuestions = createAction(
  '[questions] set Current questions',
  props<{ question: questionAdapter }>()
);

export const updateQuestion = createAction(
  '[questions] update Question',
  props<{ qId: string; selectedAnswer: string }>()
);

export const onNext = createAction('[question] on Next');
export const onBack = createAction('[question] on Back');

