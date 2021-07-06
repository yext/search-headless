import { provideCore, AnswersConfig } from '@yext/answers-core';
import ReduxStateManager from './redux-state-manager';
import StatefulCore from './stateful-core';

export function provideStatefulCore(config: AnswersConfig): StatefulCore {
  const answersCore = provideCore(config);
  const stateManager = new ReduxStateManager();

  return new StatefulCore(answersCore, stateManager);
}

export { StatefulCore };