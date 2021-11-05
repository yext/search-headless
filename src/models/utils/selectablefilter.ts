import { Filter } from '@yext/answers-core';

export interface SelectableFilter extends Filter {
  selected: boolean
}