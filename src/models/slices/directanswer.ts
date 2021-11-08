import { FeaturedSnippetDirectAnswer, FieldValueDirectAnswer } from '@yext/answers-core';

export interface DirectAnswerState {
  result?: FeaturedSnippetDirectAnswer | FieldValueDirectAnswer;
}