import { FeaturedSnippetDirectAnswer, FieldValueDirectAnswer } from '@yext/answers-core';

/**
 * Maintains the direct answer associated with the latest search.
 */
export interface DirectAnswerState {
  /**
   * The data for the direct answer.
   */
  result?: FeaturedSnippetDirectAnswer | FieldValueDirectAnswer;
}