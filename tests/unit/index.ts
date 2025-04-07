import { SearchHeadless, provideHeadless } from '../../src';
import { getHttpHeaders } from '../../src/utils/client-sdk-utils';

jest.mock('../../src/search-headless.ts');

const baseConfig = {
  apiKey: 'api-key',
  experienceKey: 'exp-key',
  locale: 'en'
};

const headlessVersionHeader = getHttpHeaders();

it('provideHeadless passes Headless agent to SearchHeadless', () => {
  provideHeadless(baseConfig);

  expect(SearchHeadless).toHaveBeenLastCalledWith(expect.anything(),
    expect.anything(), expect.anything(), expect.anything(), headlessVersionHeader);
});

it('provideHeadless passes additional HTTP headers to SearchHeadless', () => {
  const additionalHttpHeaders = {
    'Client-SDK': {
      CUSTOM_TEST_SITE: 'test'
    }
  };
  provideHeadless(baseConfig, additionalHttpHeaders);

  expect(SearchHeadless).toHaveBeenLastCalledWith(expect.anything(),expect.anything(), expect.anything(), expect.anything(), {
    'Client-SDK': {
      ...additionalHttpHeaders['Client-SDK'],
      ...headlessVersionHeader['Client-SDK']
    }
  });
});
