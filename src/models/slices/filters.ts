import { DisplayableFacet, SortBy } from '@yext/answers-core';
import { SelectableFilter } from '../utils/selectablefilter';

export interface FiltersState {
  static?: {
   [filterCollectionId: string]: SelectableFilter[];
  }
  facets?: DisplayableFacet[];
  sortBys?: SortBy[]
}