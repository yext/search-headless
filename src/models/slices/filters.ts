import { CombinedFilter, Filter, DisplayableFacet, Facet } from '@yext/answers-core';
export interface FiltersState {
  static?: Filter | CombinedFilter | null;
  facets?: Facet[];
  displayableFacets?: DisplayableFacet[];
}