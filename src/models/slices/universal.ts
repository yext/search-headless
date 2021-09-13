import { UniversalSearchResponse, AutocompleteResponse } from '@yext/answers-core';

export interface UniversalSearchState {
  numSearchesRunning: number,
  results?: UniversalSearchResponse,
  autoComplete?: AutocompleteResponse,
  searchIsLoading?: boolean
}