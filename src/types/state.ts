import { QueryState } from './query';
import { UniversalSearchState } from './universal';
import { VerticalSearchState } from './vertical';

export interface State {
  query: QueryState,
  universal: UniversalSearchState,
  vertical: VerticalSearchState
}