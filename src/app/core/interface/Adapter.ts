import {
  questionAdapter,
  questionResponse,
} from '../../Feature/Exam/interface/question';

export interface Adapter {
  questionAdaptor(data: questionResponse): questionAdapter[];
}
