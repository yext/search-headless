import { CombinedFilter, DisplayableFacet, Filter } from '@yext/answers-core';
export interface FiltersState {
  static?: Filter | CombinedFilter | null;
  facets?: DisplayableFacet[];
}