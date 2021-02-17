import StatefulCore from './core';

async function test() {
  const statefulCore = new StatefulCore();
  statefulCore.setVerticalKey('people');
  statefulCore.setQuery('Consulting');
  await statefulCore.executeVerticalQuery();
  console.log(statefulCore.verticalResults);
  console.log(statefulCore.facets);
}

test();