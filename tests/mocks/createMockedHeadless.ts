import HttpManager from '../../src/http-manager';
import { State } from '../../src/models/state';
import ReduxStateManager from '../../src/redux-state-manager';
import SearchHeadless from '../../src/search-headless';
import { createBaseStore, HeadlessEnhancedStore } from '../../src/store';
import { DEFAULT_HEADLESS_ID } from '../../src/constants';
import HeadlessReducerManager from '../../src/headless-reducer-manager';
import { getHttpHeaders } from '../../src/utils/client-sdk-utils';
import { HeadlessConfig } from "../../src";

/**
 * Creates a Search Headless instance with a mocked Search Core.
 *
 * @param mockedSearchCore - Search Core overrides
 * @param initialState - The initial state of Search Headless
 * @returns The new Search Headless instance
 */
export function createMockedHeadless(
  mockedSearchCore: any = {},
  initialState: Partial<State> = {},
  store?: HeadlessEnhancedStore,
  headlessReducerManager?: HeadlessReducerManager,
  httpManager?: HttpManager,
  searchConfig?: HeadlessConfig,
): SearchHeadless {
  const reduxStateManager = new ReduxStateManager(
    store || createBaseStore(), DEFAULT_HEADLESS_ID, headlessReducerManager || new HeadlessReducerManager());
  const headlessHttpManager = httpManager || new HttpManager();
  const headlessConfig = searchConfig || {} as HeadlessConfig;
  const answers = new SearchHeadless(headlessConfig,
    mockedSearchCore, reduxStateManager, headlessHttpManager, getHttpHeaders());
  answers.setState({
    ...answers.state,
    ...initialState
  });
  return answers;
}
