import { FilterSearchResponse } from '@yext/answers-core';

interface FilterSearchState {
  query: string,
  results?: FilterSearchResponse
}

export interface FilterSearchStates {
  [filterSearchId: string]: FilterSearchState
}