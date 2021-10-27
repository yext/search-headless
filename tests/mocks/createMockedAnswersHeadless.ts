import HttpManager from '../../src/http-manager';
import { ParentState, State } from '../../src/models/state';
import ReduxStateManager from '../../src/redux-state-manager';
import AnswersHeadless from '../../src/answers-headless';
import { ActionWithHeadlessId, createBaseStore } from '../../src/store';
import { EnhancedStore } from '@reduxjs/toolkit';
import { DEFAULT_ID } from '../../src/constants';
import ReducerManager from '../../src/reducer-manager';

/**
 * Creates an Answers Headless instance with a mocked answers core
 *
 * @param {Partial<AnswersCore>} mockedAnswersCore Answers core overrides
 * @param {Partial<State>} initialState The initial state of Answers Headless
 * @returns
 */
export function createMockedAnswersHeadless(
  mockedAnswersCore: any = {},
  initialState: Partial<State> = {},
  store?: EnhancedStore<ParentState, ActionWithHeadlessId>,
  reducerManager?: ReducerManager
): AnswersHeadless {
  const reduxStateManager = new ReduxStateManager(
    store || createBaseStore(), DEFAULT_ID, reducerManager || new ReducerManager());
  const httpManager = new HttpManager();
  const answers = new AnswersHeadless(mockedAnswersCore, reduxStateManager, httpManager);
  answers.setState({
    ...answers.state,
    ...initialState
  });
  return answers;
}
