import { QuerySource, QueryTrigger, SearchIntent } from '@yext/answers-core';

/**
 * The state for the query.
 */
export interface QueryState {
  /**
   * The user query input.
   */
  input?: string,
  /**
   * The ID of the query.
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