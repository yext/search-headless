import { QuerySource, QueryTrigger, SearchIntent } from '@yext/answers-core';

interface SearchAggregationState {
  enabled: boolean,
  id: string
}

export interface QueryState {
  input?: string,
  queryId?: string,
  queryTrigger?: QueryTrigger,
  querySource?: QuerySource,
  mostRecentSearch?: string,
  searchIntents?: SearchIntent[],
  searchAggregation?: SearchAggregationState
}