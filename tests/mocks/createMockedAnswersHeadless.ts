import HttpManager from '../../src/http-manager';
import { State } from '../../src/models/state';
import ReduxStateManager from '../../src/state-managers/redux-state-manager';
import AnswersHeadless from '../../src/answers-headless';
import { createBaseStore } from '../../src/store';
import { EnhancedStore } from '@reduxjs/toolkit';

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
  store?: EnhancedStore
): AnswersHeadless {
  const reduxStateManager = new ReduxStateManager(store || createBaseStore());
  const httpManager = new HttpManager();
  const answers = new AnswersHeadless(mockedAnswersCore, reduxStateManager, httpManager);
  answers.setState({
    ...answers.state,
    ...initialState
  });
  return answers;
}
