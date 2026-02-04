// export type modal =
export type ExamSautes = 'Started' | 'NotStarted' | 'Closed';
export interface modalState {
  isModelStatus: boolean;
  examStatus: ExamSautes;
}

export const initialModalState: modalState = {
  isModelStatus: true,
  examStatus: 'Started',
};
