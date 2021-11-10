import { VerticalSearchResponse, VerticalResults } from '@yext/answers-core';
export interface VerticalSearchState {
  alternativeVerticals?: VerticalResults[]
  key?: string,
  results?: VerticalSearchResponse,
  displayName?: string
  limit?: number,
  offset?: number,
  searchLoading?: boolean
}