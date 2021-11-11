import { DisplayableFacet, SortBy } from '@yext/answers-core';
import { SelectableFilter } from '../utils/selectablefilter';

export interface FiltersState {
  static?: SelectableFilter[];
  facets?: DisplayableFacet[];
  sortBys?: SortBy[]
}