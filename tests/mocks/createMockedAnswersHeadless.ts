import HttpManager from '../../src/http-manager';
import { ParentState, State } from '../../src/models/state';
import ReduxStateManager from '../../src/redux-state-manager';
import AnswersHeadless from '../../src/answers-headless';
import { ActionWithHeadlessId, createBaseStore } from '../../src/store';
import { EnhancedStore } from '@reduxjs/toolkit';
import { DEFAULT_HEADLESS_ID } from '../../src/constants';
import HeadlessReducerManager from '../../src/headless-reducer-manager';

/**
 * Creates an Answers Headless instance with a mocked Answers Core.
 *
 * @param mockedAnswersCore - Answers Core overrides
 * @param initialState - The initial state of Answers Headless
 * @returns The new Answers Headless instance
 */
export function createMockedAnswersHeadless(
  mockedAnswersCore: any = {},
  initialState: Partial<State> = {},
  store?: EnhancedStore<ParentState, ActionWithHeadlessId>,
  headlessReducerManager?: HeadlessReducerManager
): AnswersHeadless {
  const reduxStateManager = new ReduxStateManager(
    store || createBaseStore(), DEFAULT_HEADLESS_ID, headlessReducerManager || new HeadlessReducerManager());
  const httpManager = new HttpManager();
  const answers = new AnswersHeadless(mockedAnswersCore, reduxStateManager, httpManager);
  answers.setState({
    ...answers.state,
    ...initialState
  });
  return answers;
}
