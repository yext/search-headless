import { QuerySource, QueryTrigger, SearchIntent } from '@yext/answers-core';

export interface QueryState {
  query?: string,
  queryId?: string,
  queryTrigger?: QueryTrigger,
  querySource?: QuerySource,
  latest?: string,
  searchIntents?: SearchIntent[]
}