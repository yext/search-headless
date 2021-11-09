import {
  AppliedQueryFilter,
  AutocompleteResponse,
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
  allResultsForVertical?: AllResultsForVertical,
  alternativeVerticals?: VerticalResults[],
  appliedQueryFilters?: AppliedQueryFilter[],
  autoComplete?: AutocompleteResponse,
  displayName?: string
  limit?: number,
  offset?: number,
  queryDurationMillis?: number,
  results?: Result[],
  resultsCount?: number,
  searchLoading?: boolean,
  sortBys?: SortBy[],
  source?: Source,
  verticalKey?: string,
}