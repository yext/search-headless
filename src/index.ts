import { provideCore, AnswersConfig } from '@yext/answers-core';
import StatefulCore from './stateful-core';
import StateManager from './state-manager';

export function provideStatefulCore(config: AnswersConfig): StatefulCore {
  const answersCore = provideCore(config);
  const stateManager = new StateManager();

  return new StatefulCore(answersCore, stateManager);
}

export { StatefulCore };