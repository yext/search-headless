import { AnswersHeadless, provideAnswersHeadless } from '../../src';
import { getAdditionalHttpHeaders } from '../../src/utils/client-sdk-utils';

jest.mock('../../src/answers-headless.ts');

const baseConfig = {
  apiKey: 'api-key',
  experienceKey: 'exp-key',
  locale: 'en'
};

const headlessVersionHeader = getAdditionalHttpHeaders();

it('provideAnswersHeadless passes Headless agent to AnswersHeadless', () => {
  provideAnswersHeadless(baseConfig);

  expect(AnswersHeadless).toHaveBeenLastCalledWith(
    expect.anything(), expect.anything(), expect.anything(), headlessVersionHeader);
});

it('provideAnswersHeadless passes additional HTTP headers to AnswersHeadless', () => {
  const additionalHttpHeaders = {
    'Client-SDK': {
      CUSTOM_TEST_SITE: 'test'
    }
  };
  provideAnswersHeadless({
    ...baseConfig,
    additionalHttpHeaders
  });

  expect(AnswersHeadless).toHaveBeenLastCalledWith(expect.anything(), expect.anything(), expect.anything(), {
    'Client-SDK': {
      ...additionalHttpHeaders['Client-SDK'],
      ...headlessVersionHeader['Client-SDK']
    }
  });
});