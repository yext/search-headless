import { GenerativeDirectAnswerResponse } from '@yext/search-core';

/**
 * Maintains the data for the latest generative direct answer.
 *
 * @public
 */
export interface GenerativeDirectAnswerState {
  /**
   * Whether the AI generated answer is currently loading or has finished loading.
   */
  isLoading?: boolean,
  /**
   * The generative direct answer response.
   */
  response?: GenerativeDirectAnswerResponse
}