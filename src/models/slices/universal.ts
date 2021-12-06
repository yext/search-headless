import { UniversalLimit, VerticalResults } from '@yext/answers-core';

export interface UniversalSearchState {
  limit?: UniversalLimit,
  verticals?: VerticalResults[],
  restrictVerticals?: string[]
}