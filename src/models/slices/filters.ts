import { DisplayableFacet, SortBy } from '@yext/answers-core';
import { SelectableFilter } from '../utils/selectablefilter';

export type FilterCollection = SelectableFilter[];

export interface FiltersState {
  static?: {
   [filterCollectionId: string]: FilterCollection | null;
  }
  facets?: DisplayableFacet[];
  sortBys?: SortBy[]
}