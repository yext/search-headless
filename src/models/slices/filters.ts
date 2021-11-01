import { DisplayableFacet, SortBy } from '@yext/answers-core';
import { CombinedSelectableFilter, SelectableFilter } from '../utils/selectablefilter';

export interface FiltersState {
  static?: {
   [staticFiltersId: string]: SelectableFilter | CombinedSelectableFilter | null;
  }
  facets?: DisplayableFacet[];
  sortBys?: SortBy[]
}