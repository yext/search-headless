import { DisplayableFacet, SortBy } from '@yext/answers-core';
import { CombinedSelectableFilter, SelectableFilter } from '../utils/selectablefilter';

export interface FiltersState {
  static?: {
   [filterSetId: string]: SelectableFilter | CombinedSelectableFilter | null;
  }
  facets?: DisplayableFacet[];
  sortBys?: SortBy[]
}