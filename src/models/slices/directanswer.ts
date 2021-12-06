import { FeaturedSnippetDirectAnswer, FieldValueDirectAnswer } from '@yext/answers-core';

/**
 * The state for a direct answer.
 */
export interface DirectAnswerState {
  /**
   * The data for the direct answer.
   */
  result?: FeaturedSnippetDirectAnswer | FieldValueDirectAnswer;
}