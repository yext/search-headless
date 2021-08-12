import ReduxStateManager from '../../src/redux-state-manager';
import StatefulCore from '../../src/stateful-core';

/**
 * Creates a stateful core instance with a mocked answers core
 * 
 * @param {Partial<AnswersCore>} mockedAnswersCore Answers core overrides
 * @param {Partial<State>} initialState The initial state of the stateful core
 * @returns 
 */
export function createMockedStatefulCore(mockedAnswersCore = {}, initialState = {}) {
  const reduxStateManager = new ReduxStateManager();
  const statefulCore = new StatefulCore(mockedAnswersCore, reduxStateManager);
  statefulCore.setState(initialState);
  return statefulCore;
}