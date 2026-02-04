import { questionAdapter } from '../../core/interface/question';

export interface questionState {
  question: questionAdapter[];
  currentQuestion: questionAdapter | null;
  wrongQuestions: questionAdapter[];
}

export const initialQuestionState: questionState = {
  question: [] as questionAdapter[],
  currentQuestion: null,
  wrongQuestions: [] as questionAdapter[],
};
