import { Filter, FilterCombinator } from '@yext/answers-core';

export interface SelectableFilter {
  filter: Filter,
  selectable: boolean
}

export interface CombinedSelectableFilter {
  filters: (SelectableFilter | CombinedSelectableFilter)[];
  combinator: FilterCombinator;
}