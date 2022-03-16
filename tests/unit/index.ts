import { AnswersHeadless, provideAnswersHeadless } from '../../src';
import { getCustomClientSdk } from '../../src/utils/client-sdk-utils';

jest.mock('../../src/answers-headless.ts');

const baseConfig = {
  apiKey: 'api-key',
  experienceKey: 'exp-key',
  locale: 'en'
};

const headlessAgent = getCustomClientSdk();

it('provideAnswersHeadless passes Headless agent to AnswersHeadless', () => {
  provideAnswersHeadless(baseConfig);

  expect(AnswersHeadless).toHaveBeenLastCalledWith(
    expect.anything(), expect.anything(), expect.anything(), headlessAgent);
});

it('provideAnswersHeadless passes additional agents to AnswersHeadless', () => {
  const additionalAgents = {
    CUSTOM_TEST_SITE: 'test'
  };
  provideAnswersHeadless({
    ...baseConfig,
    additionalAgents
  });

  expect(AnswersHeadless).toHaveBeenLastCalledWith(expect.anything(), expect.anything(), expect.anything(), {
    ...additionalAgents,
    ...headlessAgent
  });
});