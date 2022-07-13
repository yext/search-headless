import { provideHeadless } from '../../src';
import { DEFAULT_HEADLESS_ID } from '../../src/constants';
import { expectedInitialState } from '../mocks/expectedInitialState';

const config = {
  apiKey: 'api-key',
  experienceKey: 'exp-key',
  locale: 'en'
};

it('multiple SearchHeadless instances link SessionTrackingState together', () => {
  const firstHeadless = provideHeadless(config);
  const secondHeadless = provideHeadless({
    ...config,
    headlessId: 'second'
  });
  const thirdHeadless = provideHeadless({
    ...config,
    headlessId: 'third'
  });
  expect(firstHeadless.state).toEqual(expectedInitialState);
  expect(secondHeadless.state).toEqual(expectedInitialState);
  expect(thirdHeadless.state).toEqual(expectedInitialState);

  firstHeadless.setSessionId('123');
  const expectedIntermediaryState = {
    ...expectedInitialState,
    sessionTracking: {
      enabled: false,
      sessionId: '123'
    }
  };
  expect(firstHeadless.state).toEqual(expectedIntermediaryState);
  expect(secondHeadless.state).toEqual(expectedIntermediaryState);
  expect(thirdHeadless.state).toEqual(expectedIntermediaryState);

  secondHeadless.setSessionTrackingEnabled(true);
  const expectedFinalState = {
    ...expectedInitialState,
    sessionTracking: {
      enabled: true,
      sessionId: '123'
    }
  };
  expect(secondHeadless.state).toEqual(expectedFinalState);
  expect(thirdHeadless.state).toEqual(expectedFinalState);
  expect(firstHeadless.state).toEqual(expectedFinalState);
});

it('an error is thrown if you manually specify a headlessId equal to the default id', () => {
  expect(() => {
    provideHeadless({
      ...config,
      headlessId: DEFAULT_HEADLESS_ID
    });
  }).toThrow('Cannot instantiate a SearchHeadless using the default headlessId');
});