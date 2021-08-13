import { QuerySource, QueryTrigger } from '@yext/answers-core';

export interface QueryState {
  query?: string,
  queryId?: string,
  queryTrigger?: QueryTrigger,
  querySource?: QuerySource,
  latest?: string,
}