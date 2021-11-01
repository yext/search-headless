import { Filter, FilterCombinator } from '@yext/answers-core';

export interface SelectableFilter {
  filter: Filter,
  selected: boolean
}

export interface CombinedSelectableFilter {
  filters: (SelectableFilter | CombinedSelectableFilter)[];
  combinator: FilterCombinator;
}