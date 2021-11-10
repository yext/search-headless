import { UniversalSearchResponse, UniversalLimit } from '@yext/answers-core';

export interface UniversalSearchState {
  results?: UniversalSearchResponse,
  searchLoading?: boolean
  limit?: UniversalLimit
}