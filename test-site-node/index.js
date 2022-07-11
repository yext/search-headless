const { provideHeadless } = require('@yext/search-headless');

const answers = provideHeadless({
  apiKey: '2d8c550071a64ea23e263118a2b0680b',
  experienceKey: 'slanswers',
  locale: 'en'
});

const test = async () => {
  answers.setQuery('virginia');
  await answers.executeUniversalQuery();
  console.log(answers.state);
}

test();