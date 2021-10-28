import { provideCore, AnswersConfig } from '@yext/answers-core';
import HttpManager from './http-manager';
import ReduxStateManager from './redux-state-manager';
import AnswersHeadless from './answers-headless';
import { createBaseStore } from './store';
import HeadlessReducerManager from './headless-reducer-manager';
import { DEFAULT_HEADLESS_ID } from './constants';

interface HeadlessConfig extends AnswersConfig {
  headlessId?: string
}

const store = createBaseStore();
const headlessReducerManager = new HeadlessReducerManager();

/**
 * Supplies a new instance of {@link AnswersHeadless}, using the provided configuration.
 *
 * @param config - The apiKey, experienceKey, etc. needed to set up a front-end Answers
 *                 experience.
 */
export function provideAnswersHeadless(config: HeadlessConfig): AnswersHeadless {
  const { headlessId, ...answersConfig } = config;
  if (headlessId === DEFAULT_HEADLESS_ID) {
    throw new Error(`Cannot instantiate an AnswersHeadless with headlessId "${headlessId}", ` +
      'because it is the same as the default ID.');
  }
  const answersCore = provideCore(answersConfig);
  const stateManager = new ReduxStateManager(
    store, headlessId || DEFAULT_HEADLESS_ID, headlessReducerManager);
  const httpManager = new HttpManager();

  return new AnswersHeadless(answersCore, stateManager, httpManager);
}

export * from './utils/filter-creators';
export {
  AnswersHeadless,
  HeadlessConfig
};