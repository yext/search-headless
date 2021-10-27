import { provideCore, AnswersConfig, AnswersCore } from '@yext/answers-core';
import HttpManager from './http-manager';
import ReduxStateManager from './redux-state-manager';
import AnswersHeadless from './answers-headless';
import { createBaseStore } from './store';
import ReducerManager from './reducer-manager';
import { DEFAULT_ID } from './constants';

type HeadlessConfig = AnswersConfig;

let answersCore: AnswersCore;
const store = createBaseStore();
const reducerManager = new ReducerManager();

/**
 * Supplies a new instance of {@link AnswersHeadless}, using the provided configuration.
 *
 * @param config - The apiKey, experienceKey, etc. needed to set up a front-end Answers
 *                 experience.
 */
export function provideAnswersHeadless(config: HeadlessConfig): AnswersHeadless {
  answersCore = provideCore(config);
  const stateManager = new ReduxStateManager(store, DEFAULT_ID, reducerManager);
  const httpManager = new HttpManager();

  return new AnswersHeadless(answersCore, stateManager, httpManager);
}

/**
 * Supplies an {@link AnswersHeadless} instance that inherits config from a preexisting parent instance.
 * Logs an error if no previous instance is found.
 */
export function provideAdditionalAnswersHeadless(headlessId: string): AnswersHeadless {
  if (headlessId === DEFAULT_ID) {
    throw new Error(`Cannot instantiate with an AnswersHeadless with headlessId "${headlessId}", ` +
      'because it is the same as the default ID.');
  }
  if (!answersCore) {
    console.error(`No AnswersCore instances found for AnswersHeadless with ID ${headlessId}. ` +
      'Make sure provideAnswersHeadless has been called before provideAdditionalAnswersHeadless.');
  }
  const stateManager = new ReduxStateManager(store, headlessId, reducerManager);
  const httpManager = new HttpManager();
  return new AnswersHeadless(answersCore, stateManager, httpManager);
}

export * from './utils/filter-creators';
export {
  AnswersHeadless,
  HeadlessConfig
};