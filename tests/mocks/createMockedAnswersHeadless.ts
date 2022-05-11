import HttpManager from '../../src/http-manager';
import { ParentState, State } from '../../src/models/state';
import ReduxStateManager from '../../src/redux-state-manager';
import AnswersHeadless from '../../src/answers-headless';
import { ActionWithHeadlessId, createBaseStore } from '../../src/store';
import { EnhancedStore } from '@reduxjs/toolkit';
import { DEFAULT_HEADLESS_ID } from '../../src/constants';
import HeadlessReducerManager from '../../src/headless-reducer-manager';
import { getHttpHeaders } from '../../src/utils/client-sdk-utils';

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
  headlessReducerManager?: HeadlessReducerManager,
  httpManager?: HttpManager
): AnswersHeadless {
  const reduxStateManager = new ReduxStateManager(
    store || createBaseStore(), DEFAULT_HEADLESS_ID, headlessReducerManager || new HeadlessReducerManager());
  const headlessHttpManager = httpManager || new HttpManager();
  const answers = new AnswersHeadless(
    mockedAnswersCore, reduxStateManager, headlessHttpManager, getHttpHeaders());
  answers.setState({
    ...answers.state,
    ...initialState
  });
  return answers;
}
