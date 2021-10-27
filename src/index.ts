import { provideCore, AnswersConfig, AnswersCore } from '@yext/answers-core';
import HttpManager from './http-manager';
import ReduxStateManager from './state-managers/redux-state-manager';
import AnswersHeadless from './answers-headless';
import { createBaseStore } from './store';
import ChildStateManager from './state-managers/child-state-manager';
import ChildReducersManager from './child-reducers-manager';

type HeadlessConfig = AnswersConfig;

let answersCore: AnswersCore;
const store = createBaseStore();
const childReducersManager = new ChildReducersManager();

/**
 * Supplies a new instance of {@link AnswersHeadless}, using the provided configuration.
 *
 * @param config - The apiKey, experienceKey, etc. needed to set up a front-end Answers
 *                 experience.
 */
export function provideAnswersHeadless(config: HeadlessConfig): AnswersHeadless {
  answersCore = provideCore(config);
  const stateManager = new ReduxStateManager(store);
  const httpManager = new HttpManager();

  return new AnswersHeadless(answersCore, stateManager, httpManager);
}

/**
 * Supplies an {@link AnswersHeadless} instance, but inheriting data from a preexisting parent instance.
 * Logs an error if no previous instance is found.
 */
export function provideChildAnswersHeadless(childId: string): AnswersHeadless {
  if (!answersCore) {
    console.error('No parent AnswersCore found. ' +
      'Make sure provideAnswersHeadless has been called before provideChildAnswersHeadless.');
  }
  const stateManager = new ChildStateManager(store, childId, childReducersManager);
  const httpManager = new HttpManager();
  return new AnswersHeadless(answersCore, stateManager, httpManager);
}

export * from './utils/filter-creators';
export {
  AnswersHeadless,
  HeadlessConfig
};