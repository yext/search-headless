import { Context } from '@yext/answers-core';

/**
 * Maintains the metadata for network requests.
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
   * A unique id which corresponds to the latest request/response.
   */
  uuid?: string
}