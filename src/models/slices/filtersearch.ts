import { AutocompleteResult, SearchIntent } from '@yext/answers-core';

export interface FilterSearchState {
  query: string,
  sectioned?: boolean,
  sections?: {
    label: string,
    results: AutocompleteResult[]
  }[],
  results?: AutocompleteResult[],
  searchIntents?: SearchIntent[],
  queryId?: string,
  uuid?: string
}

export interface FilterSearchStates {
  [filterSearchId: string]: FilterSearchState
}