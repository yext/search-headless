import {
  AppliedQueryFilter,
  DisplayableFacet,
  Result,
  SortBy,
  Source,
  VerticalResults
} from '@yext/search-core';

/**
 * Represents all results for the current vertical.
 *
 * @public
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
  resultsCount: number
}

/**
 * Maintains the data for the latest vertical search.
 *
 * @public
 */
export interface VerticalSearchState {
  /**
   * The array of filters inferred from the query and applied to the search.
   */
  appliedQueryFilters?: AppliedQueryFilter[],
  /**
   * Name to be displayed for the vertical.
   */
  displayName?: string,
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
     * The results from other verticals in the experience.
     */
    alternativeVerticals: VerticalResults[]
  },
  /**
   * The number of results that should be skipped when fetching results for the
   * response. Allows for fetching more results with the same query.
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
   * The criteria by which the results should be sorted, in the order in which they
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
  /**
   * The radius (in meters) to filter vertical searches by.
   */
  locationRadius?: number
}

export function isVerticalResults(vertical: VerticalSearchState): vertical is VerticalResults {
  return (vertical as VerticalResults).appliedQueryFilters !== undefined
    && (vertical as VerticalResults).queryDurationMillis !== undefined
    && (vertical as VerticalResults).results !== undefined
    && (vertical as VerticalResults).resultsCount !== undefined
    && (vertical as VerticalResults).source !== undefined
    && (vertical as VerticalResults).verticalKey !== undefined;
}
