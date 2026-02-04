import { createReducer, on } from '@ngrx/store';
import { ExamSautes, initialModalState } from './modal.state';
import { closeModal, openModal, resetModal } from './modal.action';

export const modalReducer = createReducer(
  initialModalState,
  on(openModal, (state) => ({
    ...state,
    isModelStatus: true,
    examStatus: 'Started' as ExamSautes,
  })),
  on(closeModal, (state) => ({
    ...state,
    isModelStatus: false,
  })),
  on(resetModal, () => initialModalState)
);
