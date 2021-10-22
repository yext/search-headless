import { provideCore, AnswersConfig } from '@yext/answers-core';
import AnswersUtilities from './answers-utilities';
import HttpManager from './http-manager';
import ReduxStateManager from './redux-state-manager';
import StatefulCore from './stateful-core';

/**
 * Supplies a new instance of {@link StatefulCore}, using the provided configuration.
 *
 * @param config - The apiKey, experienceKey, etc. needed to set up a front-end Answers
 *                 experience.
 */
export function provideStatefulCore(config: AnswersConfig): StatefulCore {
  const answersCore = provideCore(config);
  const stateManager = new ReduxStateManager();
  const httpManager = new HttpManager();
  const answersUtilities = new AnswersUtilities();

  return new StatefulCore(answersCore, stateManager, httpManager, answersUtilities);
}

export * from './utils/filter-creators';
export { StatefulCore };