import { Matcher } from '@yext/answers-core';
import StatefulCore from './core';

async function test() {
  const statefulCore = new StatefulCore();
  statefulCore.setVerticalKey('people');
  statefulCore.setQuery('Consulting');
  statefulCore.setFilters([
    {
      fieldId: 'c_awards',
      matcher: Matcher.Equals,
      value: 'Roses Friend'
    }
  ]);
  await statefulCore.executeVerticalQuery();
}

test();