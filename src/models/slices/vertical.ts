import { VerticalSearchResponse, AutocompleteResponse, VerticalResults } from '@yext/answers-core';
export interface VerticalSearchState {
  numSearchesRunning: number,
  alternativeVerticals?: VerticalResults[]
  key?: string,
  autoComplete?: AutocompleteResponse,
  results?: VerticalSearchResponse,
  displayName?: string
  limit?: number,
  offset?: number,
  searchIsLoading?: boolean
}