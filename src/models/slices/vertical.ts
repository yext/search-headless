import { VerticalSearchResponse, AutocompleteResponse, VerticalResults } from '@yext/answers-core';
export interface VerticalSearchState {
  alternativeVerticals?: VerticalResults[]
  key?: string,
  autoComplete?: AutocompleteResponse,
  results?: VerticalSearchResponse,
  displayName?: string
  limit?: number,
  offset?: number,
  searchLoading?: boolean
}