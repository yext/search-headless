import { FiltersState } from './slices/filters';
import { QueryState } from './slices/query';
import { UniversalSearchState } from './slices/universal';
import { VerticalSearchState } from './slices/vertical';
import { SpellCheckState } from './slices/spellcheck';
import { MetaState } from './slices/meta';
import { LocationState } from './slices/location';
import { SessionTrackingState } from './slices/sessiontracking';

export interface State {
  query: QueryState,
  universal: UniversalSearchState,
  vertical: VerticalSearchState,
  filters: FiltersState,
  spellCheck: SpellCheckState,
  sessionTracking: SessionTrackingState
  meta: MetaState,
  location: LocationState,
  childStates?: {
    [childId: string]: State
  }
}

/**
 * A {@link ChildState} is just a regular {@link State} without any children.
 */
export type ChildState = Omit<State, 'childStates'>;