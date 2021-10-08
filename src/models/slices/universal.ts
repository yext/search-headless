import { UniversalSearchResponse, AutocompleteResponse, UniversalLimit } from '@yext/answers-core';

export interface UniversalSearchState {
  results?: UniversalSearchResponse,
  autoComplete?: AutocompleteResponse,
  searchLoading?: boolean
  limit?: UniversalLimit
}