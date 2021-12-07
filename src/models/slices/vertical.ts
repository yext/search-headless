import {
  AppliedQueryFilter,
  DisplayableFacet,
  Result,
  SearchIntent,
  SortBy,
  Source,
  VerticalResults
} from '@yext/answers-core';

/**
 * Represents all results for the current vertical.
 */
export interface AllResultsForVertical {
  /**
   * {@inheritDoc FiltersState.facets}
   */
  facets: DisplayableFacet[],
  /**
   * The array of all results for the vertical.
   */
  results: Result[],
  /**
   * The total number of results for the vertical.
   */
  resultsCount: number,
  /**
   * {@inheritDoc QueryState.searchIntents}
   */
  searchIntents: SearchIntent[]
}

/**
 * Maintains the data for the latest universal search.
 */
export interface VerticalSearchState {
  /**
   * The array of filters inferred from the query and applied to the search.
   */
  appliedQueryFilters?: AppliedQueryFilter[],
  /**
   * Name to be displayed for the vertical.
   */
  displayName?: string
  /**
   * The maximum number of results to include for the vertical search.
   */
  limit?: number,
  /**
   * The data for when no results are returned in the vertical search.
   */
  noResults?: {
    /**
     * {@inheritDoc AllResultsForVertical}
     */
    allResultsForVertical: AllResultsForVertical,
    /**
     * The results from alternative verticals.
     */
    alternativeVerticals: VerticalResults[],
  }
  /**
   * The number of results to skip.
   */
  offset?: number,
  /**
   * The duration of the query in milliseconds.
   */
  queryDurationMillis?: number,
  /**
   * The results from the vertical search.
   */
  results?: Result[],
  /**
   * The number of results for the vertical search.
   */
  resultsCount?: number,
  /**
   * Criteria by which the results should be sorted, in the order in which they
   * should be applied.
   */
  sortBys?: SortBy[],
  /**
   * The source of the vertical search results.
   */
  source?: Source,
  /**
   * The key associated with the vertical.
   */
  verticalKey?: string,
}