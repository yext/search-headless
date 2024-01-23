const { provideHeadless } = require('@yext/search-headless');

const answers = provideHeadless({
  apiKey: '<REPLACE ME>',
  experienceKey: 'slanswers',
  locale: 'en'
});

const test = async () => {
  answers.setQuery('virginia');
  await answers.executeUniversalQuery();
  console.log(answers.state);
}

test();