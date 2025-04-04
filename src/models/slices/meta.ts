import { Context } from '@yext/search-core';
import { SearchType } from '../utils/searchType';

/**
 * Maintains the metadata for Search Headless.
 *
 * @public
 */
export interface MetaState {
  /**
   * A JSON object used for passing data to and triggering Search
   * {@link https://hitchhikers.yext.com/tracks/answers-advanced/ans302-query-rules/ | Query Rules}.
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
  uuid?: string,
  /**
   * Indicates the type of search that Search Headless is managing.
  */
  searchType: SearchType,
  /**
   * Indicates the key of the experience that Search Headless is managing.
   * Should not be adjusted after initialization.
   */
  experienceKey?: string,
  /**
   * Indicates the language of the search that Search Headless is managing.
   * Should not be adjusted after initialization.
   */
  locale?: string
}
