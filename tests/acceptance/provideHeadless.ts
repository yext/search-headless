import { provideHeadless } from '../../src';

const baseConfig = {
  apiKey: 'api-key',
  experienceKey: 'exp-key',
  locale: 'en'
};

it('meta state is populated using passed-in config', () => {
  const headless = provideHeadless({
    ...baseConfig,
    verticalKey: 'test'
  });

  expect(headless.state.meta.experienceKey).toEqual('exp-key');
  expect(headless.state.meta.locale).toEqual('en');
});

it('if apiKey is passed into the headless config, the searchType is set to \'vertical\'', () => {
  const headless = provideHeadless({
    ...baseConfig,
    verticalKey: 'test'
  });

  expect(headless.state.vertical.verticalKey).toEqual('test');
  expect(headless.state.meta.searchType).toEqual('vertical');
});

it('if no apiKey is passed into the headless config, the searchType is \'universal\'', () => {
  const headless = provideHeadless(baseConfig);

  expect(headless.state.vertical.verticalKey).toBeUndefined();
  expect(headless.state.meta.searchType).toEqual('universal');
});
