import { QuerySource, QueryTrigger, SearchIntent } from '@yext/answers-core';

/**
 * Maintains the latest query and its associated data.
 */
export interface QueryState {
  /**
   * The latest user query input.
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
   * The source of the query (either from a standard Answers integration or from an Answers overlay).
   */
  querySource?: QuerySource,
  /**
   * The query of the most recent search.
   */
  mostRecentSearch?: string,
  /**
   * The intents of the search, from the Answers API.
   */
  searchIntents?: SearchIntent[]
}