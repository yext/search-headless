import HttpManager from '../../src/http-manager';
import { State } from '../../src/models/state';
import ReduxStateManager from '../../src/redux-state-manager';
import SearchHeadless from '../../src/search-headless';
import { createBaseStore, HeadlessEnhancedStore } from '../../src/store';
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
  store?: HeadlessEnhancedStore,
  headlessReducerManager?: HeadlessReducerManager,
  httpManager?: HttpManager
): SearchHeadless {
  const reduxStateManager = new ReduxStateManager(
    store || createBaseStore(), DEFAULT_HEADLESS_ID, headlessReducerManager || new HeadlessReducerManager());
  const headlessHttpManager = httpManager || new HttpManager();
  const answers = new SearchHeadless(
    mockedAnswersCore, reduxStateManager, headlessHttpManager, getHttpHeaders());
  answers.setState({
    ...answers.state,
    ...initialState
  });
  return answers;
}
