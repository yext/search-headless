import { provideCore, AnswersConfig } from '@yext/answers-core';
import HttpManager from './http-manager';
import ReduxStateManager from './redux-state-manager';
import AnswersHeadless from './answers-headless';
import { store } from './store';

type HeadlessConfig = AnswersConfig;

/**
 * Supplies a new instance of {@link AnswersHeadless}, using the provided configuration.
 *
 * @param config - The apiKey, experienceKey, etc. needed to set up a front-end Answers
 *                 experience.
 */
export function provideAnswersHeadless(config: HeadlessConfig): AnswersHeadless {
  const answersCore = provideCore(config);
  const stateManager = new ReduxStateManager(store);
  const httpManager = new HttpManager();

  return new AnswersHeadless(answersCore, stateManager, httpManager);
}

export * from './utils/filter-creators';
export { AnswersHeadless };