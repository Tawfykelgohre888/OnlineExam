import { createFeatureSelector, createSelector } from '@ngrx/store';
import { modalState } from './modal.state';

export const selectModalStateFeature =
  createFeatureSelector<modalState>('modal');

export const selectModalStatus = createSelector(
  selectModalStateFeature,
  (state) => state.isModelStatus
);
export const selectExamStatus = createSelector(
  selectModalStateFeature,
  (state) => state.examStatus
);
