import { provideAnswersHeadless } from '../../src';

const baseConfig = {
  apiKey: 'api-key',
  experienceKey: 'exp-key',
  locale: 'en'
};

it('if apiKey is passed into the headless config, the searchType is set to \'vertical\'', () => {
  const headless = provideAnswersHeadless({
    ...baseConfig,
    verticalKey: 'test'
  });

  expect(headless.state.vertical.verticalKey).toEqual('test');
  expect(headless.state.meta.searchType).toEqual('vertical');
});

it('if no apiKey is passed into the headless config, the searchType is \'universal\'', () => {
  const headless = provideAnswersHeadless(baseConfig);

  expect(headless.state.vertical.verticalKey).toBeUndefined();
  expect(headless.state.meta.searchType).toEqual('universal');
});