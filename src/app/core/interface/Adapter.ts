import { questionAdapter, questionResponse } from './question';

export interface Adapter {
  questionAdaptor(data: questionResponse): questionAdapter[];
}
