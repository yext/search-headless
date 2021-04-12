import { UniversalSearchResponse, AutocompleteResponse } from '@yext/answers-core';

export interface UniversalSearchState {
  results?: UniversalSearchResponse,
  autoComplete?: AutocompleteResponse
}