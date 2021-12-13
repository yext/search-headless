import { provideCore, AnswersConfig } from '@yext/answers-core';
import HttpManager from './http-manager';
import ReduxStateManager from './redux-state-manager';
import AnswersHeadless from './answers-headless';
import { createBaseStore } from './store';
import HeadlessReducerManager from './headless-reducer-manager';
import { DEFAULT_HEADLESS_ID } from './constants';
import { SessionTrackingState } from './models/slices/sessiontracking';
import answersUtilities from './answers-utilities';

export * from './answers-core-re-exports';
export * from './models';
export * from './constants';
export * from './utils/filter-creators';
export { answersUtilities };

/**
 * The configuration for an AnswersHeadless instance.
 *
 * @public
 */
export type HeadlessConfig = AnswersConfig & {
  /**
   * The ID of the AnswersHeadless instance.
   *
   * @remarks
   * Must be different from {@link DEFAULT_HEADLESS_ID}.
   */
  headlessId?: string
};

let firstHeadlessInstance: AnswersHeadless;
const store = createBaseStore();
const headlessReducerManager = new HeadlessReducerManager();

/**
 * Supplies a new instance of {@link AnswersHeadless}, using the provided configuration.
 *
 * @param config - The apiKey, experienceKey, etc. needed to set up a front-end Answers
 *                 experience.
 * @returns The newly created instance of {@link AnswersHeadless}
 *
 * @public
 */
export function provideAnswersHeadless(config: HeadlessConfig): AnswersHeadless {
  const {
    headlessId,
    ...answersConfig
  } = config;
  if (headlessId === DEFAULT_HEADLESS_ID) {
    throw new Error(`Cannot instantiate an AnswersHeadless using the default headlessId "${headlessId}". `
      + 'Specify a different headlessId.');
  }
  const answersCore = provideCore(answersConfig);
  const stateManager = new ReduxStateManager(
    store, headlessId || DEFAULT_HEADLESS_ID, headlessReducerManager);
  const httpManager = new HttpManager();

  const headless = new AnswersHeadless(answersCore, stateManager, httpManager);
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
function linkSessionTracking(firstHeadless: AnswersHeadless, secondHeadless: AnswersHeadless) {
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

export { AnswersHeadless };
