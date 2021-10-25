import HttpManager from '../../src/http-manager';
import { State } from '../../src/models/state';
import ReduxStateManager from '../../src/redux-state-manager';
import AnswersHeadless from '../../src/answers-headless';

/**
 * Creates an Answers Headless instance with a mocked answers core
 *
 * @param {Partial<AnswersCore>} mockedAnswersCore Answers core overrides
 * @param {Partial<State>} initialState The initial state of Answers Headless
 * @returns
 */
export function createMockedAnswersHeadless(
  mockedAnswersCore: any = {},
  initialState: Partial<State> = {}
): AnswersHeadless {
  const reduxStateManager = new ReduxStateManager();
  const httpManager = new HttpManager();
  const answers = new AnswersHeadless(mockedAnswersCore, reduxStateManager, httpManager);
  answers.setState({
    ...answers.state,
    ...initialState
  });
  return answers;
}