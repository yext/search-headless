import { QuerySource, QueryTrigger, SearchIntent } from '@yext/search-core';

/**
 * Maintains the latest query and its associated data.
 *
 * @public
 */
export interface QueryState {
  /**
   * The user input used for the next search query.
   */
  input?: string,
  /**
   * The ID of the query from the latest search.
   */
  queryId?: string,
  /**
   * How the query was triggered (besides user input).
   */
  queryTrigger?: QueryTrigger,
  /**
   * The source of the query (from a standard Search integration, a Search
   * overlay, or from visual autocomplete).
   */
  querySource?: QuerySource,
  /**
   * The query of the most recent search.
   */
  mostRecentSearch?: string,
  /**
   * The computed intents of the mostRecentSearch, as returned by the Search API.
   */
  searchIntents?: SearchIntent[],
  /**
   * Whether the next query represents a pagination - in which case queryId will be maintained
   */
  isPagination?: boolean
}
