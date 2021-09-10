import { CombinedFilter, DisplayableFacet, Filter, SortBy } from '@yext/answers-core';

export interface FiltersState {
  static?: Filter | CombinedFilter | null;
  facets?: DisplayableFacet[];
  sortBys?: SortBy[]
}