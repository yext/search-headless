import { FeaturedSnippetDirectAnswer, FieldValueDirectAnswer } from '@yext/answers-core';

/**
 * Maintains the direct answer associated with the latest search.
 */
export interface DirectAnswerState {
  /**
   * The data for the direct answer. The type of the data is based on where the
   * answer was found by the Answers API.
   */
  result?: FeaturedSnippetDirectAnswer | FieldValueDirectAnswer;
}