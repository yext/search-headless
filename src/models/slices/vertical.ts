import { VerticalSearchResponse, Facet, AutocompleteResponse, VerticalSearchRequest } from '@yext/answers-core';

export interface VerticalSearchState {
  key?: string,
  autoComplete?: AutocompleteResponse,
  results?: VerticalSearchResponse,
  facets?: Facet[],
  request?: VerticalSearchRequest
}