import {
  AppliedQueryFilter,
  DisplayableFacet,
  Result,
  SearchIntent,
  SortBy,
  Source,
  VerticalResults
} from '@yext/answers-core';

export interface AllResultsForVertical {
  facets: DisplayableFacet[],
  results: Result[],
  resultsCount: number,
  searchIntents: SearchIntent[]
}

export interface VerticalSearchState {
  appliedQueryFilters?: AppliedQueryFilter[],
  displayName?: string
  limit?: number,
  noResults?: {
    allResultsForVertical: AllResultsForVertical,
    alternativeVerticals: VerticalResults[],
  }
  offset?: number,
  queryDurationMillis?: number,
  results?: Result[],
  resultsCount?: number,
  sortBys?: SortBy[],
  source?: Source,
  verticalKey?: string,
}