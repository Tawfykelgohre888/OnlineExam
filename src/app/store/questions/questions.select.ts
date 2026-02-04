import { createFeatureSelector, createSelector } from '@ngrx/store';
import { questionState } from './qustions.state';
export const selectQuestionState =
  createFeatureSelector<questionState>('questions');

export const selectNumQuestion = createSelector(
  selectQuestionState,
  (state) => state.question.length
);
export const selectNumOfWrongQuestion = createSelector(
  selectQuestionState,
  (state) => state.wrongQuestions
);
export const selectCurrentQuestion = createSelector(
  selectQuestionState,
  (state) => state.currentQuestion
);
