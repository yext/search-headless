import { AutocompleteResponse, UniversalLimit, VerticalResults } from '@yext/answers-core';

export interface UniversalSearchState {
  autoComplete?: AutocompleteResponse,
  limit?: UniversalLimit,
  verticals?: VerticalResults[],
  searchLoading?: boolean
}