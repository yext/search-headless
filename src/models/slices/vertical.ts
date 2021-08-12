import { VerticalSearchResponse, Facet, AutocompleteResponse } from '@yext/answers-core';

export interface VerticalSearchState {
  key?: string,
  autoComplete?: AutocompleteResponse,
  results?: VerticalSearchResponse,
  facets?: Facet[],
  limit?: number,
  offset?: number
}