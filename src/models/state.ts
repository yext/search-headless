import { FiltersState } from './slices/filters';
import { QueryState } from './slices/query';
import { UniversalSearchState } from './slices/universal';
import { VerticalSearchState } from './slices/vertical';

export interface State {
  query: QueryState,
  universal: UniversalSearchState,
  vertical: VerticalSearchState,
  filters: FiltersState
}