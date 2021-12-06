import { Context } from '@yext/answers-core';

/**
 * The state for the response metadata.
 */
export interface MetaState {
  /**
   * A JSON object used for triggering and passing data to query rules.
   */
  context?: Context,
  /**
   * The URL of the referring page (the page that directed to the current page from
   * which the request was made).
   */
  referrerPageUrl?: string,
  /**
   * A unique id which corresponds to the request.
   */
  uuid?: string
}