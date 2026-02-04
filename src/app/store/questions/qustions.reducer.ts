import { createReducer, on } from '@ngrx/store';
import { initialQuestionState } from './qustions.state';
import {
  onBack,
  onNext,
  setCurrentQuestions,
  setQuestions,
  updateQuestion,
} from './questions.action';

export const questionReducer = createReducer(
  initialQuestionState,
  on(setQuestions, (state, { question }) => ({
    ...state,
    question,
  })),

  on(setCurrentQuestions, (state, { question }) => ({
    ...state,
    currentQuestion: question,
  })),
  on(updateQuestion, (state, { qId, selectedAnswer }) => ({
    ...state,
    question: state.question.map((q) =>
      q._id === qId ? { ...q, selectedAnswer } : q
    ),
  })),
  on(onNext, (state) => ({
    ...state,
    currentQuestion: state.question[state.currentQuestion!.index ],
  })),
  on(onBack, (state) => ({
    ...state,
    currentQuestion: state.question[state.currentQuestion!.index - 2],
  }))
);
