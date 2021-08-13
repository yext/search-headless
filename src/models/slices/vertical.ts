import { VerticalSearchResponse, Facet, AutocompleteResponse, VerticalResults } from '@yext/answers-core';

export interface VerticalSearchState {
  alternativeVerticals?: VerticalResults[]
  key?: string,
  autoComplete?: AutocompleteResponse
  results?: VerticalSearchResponse,
  facets?: Facet[],
  displayName?: string
}