import AnswersUtilities from '../../src/answers-utilities';
import HttpManager from '../../src/http-manager';
import { State } from '../../src/models/state';
import ReduxStateManager from '../../src/redux-state-manager';
import StatefulCore from '../../src/stateful-core';

/**
 * Creates a stateful core instance with a mocked answers core
 *
 * @param {Partial<AnswersCore>} mockedAnswersCore Answers core overrides
 * @param {Partial<State>} initialState The initial state of the stateful core
 * @returns
 */
export function createMockedStatefulCore(
  mockedAnswersCore: any = {},
  initialState: Partial<State> = {}
): StatefulCore {
  const reduxStateManager = new ReduxStateManager();
  const httpManager = new HttpManager();
  const answersUtilities = new AnswersUtilities();
  const statefulCore = new StatefulCore(mockedAnswersCore, reduxStateManager, httpManager, answersUtilities);
  statefulCore.setState({
    ...statefulCore.state,
    ...initialState
  });
  return statefulCore;
}