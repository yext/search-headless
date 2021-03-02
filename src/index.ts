import { provideCore, Matcher } from '@yext/answers-core';
import StatefulCore from './core';
import StateManager from './state-manager';

async function test() {
  const answersCore = provideCore({
    apiKey: 'df4b24f4075800e5e9705090c54c6c13', 
    experienceKey: 'rosetest', 
    locale: 'en' 
  });
  const stateManager = new StateManager();
  const statefulCore = new StatefulCore(answersCore, stateManager);

  statefulCore.setQuery('Yext');
  statefulCore.setVerticalKey('people');

  statefulCore.setQuery('Consulting');

  await statefulCore.executeVerticalQuery();
  console.log(statefulCore.state);

  statefulCore.setQuery('Yext');
  await statefulCore.executeUniversalQuery();
  console.log(statefulCore.state);
}

test();