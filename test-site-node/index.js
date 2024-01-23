const { provideHeadless } = require('@yext/search-headless');

const answers = provideHeadless({
  apiKey: process.env.API_KEY,
  experienceKey: 'slanswers',
  locale: 'en'
});

const test = async () => {
  answers.setQuery('virginia');
  await answers.executeUniversalQuery();
  console.log(answers.state);
}

test();