import { provideCore, SearchConfig, AdditionalHttpHeaders } from '@yext/search-core';
import HttpManager from './http-manager';
import ReduxStateManager from './redux-state-manager';
import SearchHeadless from './search-headless';
import { createBaseStore } from './store';
import HeadlessReducerManager from './headless-reducer-manager';
import { DEFAULT_HEADLESS_ID } from './constants';
import { SessionTrackingState } from './models/slices/sessiontracking';
import * as searchUtilities from './search-utilities';
import { getHttpHeaders } from './utils/client-sdk-utils';

export * from './search-core-re-exports';
export * from './models';
export * from './constants';
export * from './utils/filter-creators';
export { searchUtilities };

/**
 * The configuration for a SearchHeadless instance.
 *
 * @public
 */
export type HeadlessConfig = SearchConfig & {
  /**
   * The ID of the SearchHeadless instance.
   *
   * @remarks
   * Must be different from {@link DEFAULT_HEADLESS_ID}.
   */
  headlessId?: string,
  /**
   * The verticalKey associated with the vertical to manage. If none is provided,
   * Search Headless will manage universal search.
   */
  verticalKey?: string
};

let firstHeadlessInstance: SearchHeadless;
const store = createBaseStore();
const headlessReducerManager = new HeadlessReducerManager();

/**
 * Supplies a new instance of {@link SearchHeadless}, using the provided configuration.
 *
 * @param config - The apiKey, experienceKey, etc. needed to set up a front-end Search
 *                 experience.
 * @returns The newly created instance of {@link SearchHeadless}
 *
 * @public
 */
export function provideHeadless(config: HeadlessConfig): SearchHeadless;

/**
 * Supplies a new instance of {@link SearchHeadless}, using the provided configuration,
 * and accepts additional HTTP headers to pass with API requests.
 *
 * @param config - The apiKey, experienceKey, etc. needed to set up a front-end Search
 *                 experience
 * @param additionalHttpHeaders - Additional value for specific HTTP headers
 * @returns The newly created instance of {@link SearchHeadless}
 *
 * @internal
 */
// eslint-disable-next-line @yext/export-star/no-duplicate-exports
export function provideHeadless(
  config: HeadlessConfig,
  additionalHttpHeaders: AdditionalHttpHeaders
): SearchHeadless;

// eslint-disable-next-line @yext/export-star/no-duplicate-exports
export function provideHeadless(
  config: HeadlessConfig,
  additionalHttpHeaders?: AdditionalHttpHeaders
): SearchHeadless {
  const {
    verticalKey,
    headlessId,
    ...searchConfig
  } = config;
  if (headlessId === DEFAULT_HEADLESS_ID) {
    throw new Error(`Cannot instantiate a SearchHeadless using the default headlessId "${headlessId}". `
      + 'Specify a different headlessId.');
  }
  const searchCore = provideCore(searchConfig);
  const stateManager = new ReduxStateManager(
    store, headlessId || DEFAULT_HEADLESS_ID, headlessReducerManager);
  const httpManager = new HttpManager();
  const httpHeaders = getHttpHeaders(additionalHttpHeaders);

  const headless = new SearchHeadless(searchConfig, searchCore, stateManager, httpManager, httpHeaders);
  verticalKey
    ? headless.setVertical(verticalKey)
    : headless.setUniversal();
  if (!firstHeadlessInstance) {
    firstHeadlessInstance = headless;
  } else {
    // Two-way bind the current headless instances with the first one instantiated on the page.
    // This way, all headless instances on a page will have their sessionTracking states linked.
    // We have to be careful not to create an infinite loop here.
    linkSessionTracking(firstHeadlessInstance, headless);
    linkSessionTracking(headless, firstHeadlessInstance);
  }
  return headless;
}

/**
 * Links the secondHeadless instance to sessionTracking updates made to the firstHeadless
 * instance.
 */
function linkSessionTracking(firstHeadless: SearchHeadless, secondHeadless: SearchHeadless) {
  firstHeadless.addListener<SessionTrackingState>({
    valueAccessor: state => state.sessionTracking,
    callback: sessionTracking => {
      secondHeadless.setState({
        ...secondHeadless.state,
        sessionTracking
      });
    }
  });
}

export { SearchHeadless };
