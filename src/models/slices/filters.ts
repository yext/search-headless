import { DisplayableFacet, SortBy } from '@yext/answers-core';
import { SelectableFilter } from '../utils/selectablefilter';

export interface FiltersState {
  static?: {
   [filterSetId: string]: SelectableFilter[] | null;
  }
  facets?: DisplayableFacet[];
  sortBys?: SortBy[]
}