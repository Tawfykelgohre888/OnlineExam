
export interface Question {
  _id: string;
  question: string;
  answers: Answer[];
  type: string;
  correct: string;
  subject: Subject;
  exam: Exam;
  createdAt: string;
}

export interface Exam {
  _id: string;
  title: string;
  duration: number;
  subject: string;
  numberOfQuestions: number;
  active: boolean;
  createdAt: string;
}

export interface Subject {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
}

export interface Answer {
  answer: string;
  key: string;
}