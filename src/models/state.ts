import { FiltersState } from './slices/filters';
import { QueryState } from './slices/query';
import { UniversalSearchState } from './slices/universal';
import { VerticalSearchState } from './slices/vertical';
import { SpellCheckState } from './slices/spellcheck';
import { MetaState } from './slices/meta';
import { LocationState } from './slices/location';
import { SessionTrackingState } from './slices/sessiontracking';
import { DirectAnswerState } from './slices/directanswer';
import { SearchStatusState } from './slices/searchstatus';
import { QueryRulesState } from './slices/queryrules';

/**
 * The overall shape of the redux state tree, with each key value pair of
 * headlessId to {@link State} representing a single AnswersHeadless instance.
 *
 * @public
 */
export interface ParentState {
  /**
   * A mapping of the ID of an AnswersHeadless instance to its {@link State}.
   */
  [headlessId: string]: State
}

/**
 * The state representing an AnswersHeadless instance.
 *
 * @public
 */
export interface State {
  /**
   * {@inheritDoc QueryState}
   */
  query: QueryState,
  /**
   * {@inheritDoc UniversalSearchState}
   */
  universal: UniversalSearchState,
  /**
   * {@inheritDoc VerticalSearchState}
   */
  vertical: VerticalSearchState,
  /**
   * {@inheritDoc DirectAnswerState}
   */
  directAnswer: DirectAnswerState,
  /**
   * {@inheritDoc QueryRulesState}
   */
  queryRules: QueryRulesState,
  /**
   * {@inheritDoc FiltersState}
   */
  filters: FiltersState,
  /**
   * {@inheritDoc SearchStatusState}
   */
  searchStatus: SearchStatusState,
  /**
   * {@inheritDoc SpellCheckState}
   */
  spellCheck: SpellCheckState,
  /**
   * {@inheritDoc SessionTrackingState}
   */
  sessionTracking: SessionTrackingState,
  /**
   * {@inheritDoc MetaState}
   */
  meta: MetaState,
  /**
   * {@inheritDoc LocationState}
   */
  location: LocationState
}
