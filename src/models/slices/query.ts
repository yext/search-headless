import { QuerySource, QueryTrigger, SearchIntent } from '@yext/answers-core';

export interface QueryState {
  input?: string,
  queryId?: string,
  queryTrigger?: QueryTrigger,
  querySource?: QuerySource,
  mostRecentSearch?: string,
  searchIntents?: SearchIntent[],
  searchAggregationId?: string
}