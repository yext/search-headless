import {
  VerticalSearchRequest,
  UniversalSearchRequest,
  SearchIntent
} from '@yext/answers-core';
import HttpManager from '../../src/http-manager';
import ReduxStateManager from '../../src/redux-state-manager';
import AnswersHeadless from '../../src/answers-headless';
import { createMockedAnswersHeadless } from '../mocks/createMockedAnswersHeadless';
import { createBaseStore } from '../../src/store';
import { DEFAULT_HEADLESS_ID } from '../../src/constants';
import HeadlessReducerManager from '../../src/headless-reducer-manager';

it('vertical searches set search intents', async () => {
  const mockSearch = jest.fn((_request: VerticalSearchRequest) => Promise.resolve({
    searchIntents: [SearchIntent.NearMe]
  }));
  const answers = createMockedAnswersHeadless({
    verticalSearch: mockSearch
  });
  answers.setVertical('vertical-key');
  expect(answers.state.query.searchIntents).toEqual(undefined);
  await answers.executeVerticalQuery();
  expect(answers.state.query.searchIntents).toEqual(['NEAR_ME']);
});

it('universal searches set search intents', async () => {
  const mockSearch = jest.fn((_request: UniversalSearchRequest) => Promise.resolve({
    searchIntents: [SearchIntent.NearMe]
  }));
  const answers = createMockedAnswersHeadless({
    universalSearch: mockSearch
  });
  expect(answers.state.query.searchIntents).toEqual(undefined);
  await answers.executeUniversalQuery();
  expect(answers.state.query.searchIntents).toEqual(['NEAR_ME']);
});

describe('sessionId to request works as expected', () => {
  const verticalMockSearch = jest.fn().mockReturnValue({});
  const universalMockSearch = jest.fn().mockReturnValue({});
  const answers = createMockedAnswersHeadless({
    verticalSearch: verticalMockSearch,
    universalSearch: universalMockSearch
  });
  answers.setVertical('vertical-key');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sessionId is in request when sessionTrackingEnabled is true', async () => {
    answers.setSessionTrackingEnabled(true);
    answers.setSessionId('some-session-id');

    answers.setVertical('vertical-key');
    await answers.executeVerticalQuery();
    answers.setUniversal();
    await answers.executeUniversalQuery();
    expect(verticalMockSearch.mock.calls[0][0])
      .toEqual(expect.objectContaining({ sessionId: 'some-session-id' }));
    expect(universalMockSearch.mock.calls[0][0])
      .toEqual(expect.objectContaining({ sessionId: 'some-session-id' }));
  });

  it('sessionId is not in request when sessionTrackingEnabled is false', async () => {
    answers.setSessionTrackingEnabled(false);
    answers.setSessionId('some-session-id');

    answers.setVertical('vertical-key');
    await answers.executeVerticalQuery();
    answers.setUniversal();
    await answers.executeUniversalQuery();

    expect(verticalMockSearch.mock.calls[0][0])
      .toEqual(expect.not.objectContaining({ sessionId: 'some-session-id' }));
    expect(universalMockSearch.mock.calls[0][0])
      .toEqual(expect.not.objectContaining({ sessionId: 'some-session-id' }));
  });
});

describe('ensure correct results from latest request', () => {
  jest.useFakeTimers();
  const queries = ['really long request', 'short', 'long request'];
  const requestsTime = {
    [queries[0]]: 20,
    [queries[1]]: 5,
    [queries[2]]: 12
  };
  const updateResult = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('vertical search get correct results based on up-to-date response', async () => {
    const answers = getAnswersHeadless(requestsTime);
    answers.setVertical('someKey');
    answers.addListener({
      valueAccessor: state => state.vertical?.results,
      callback: updateResult
    });
    answers.setQuery(queries[0]);
    const firstResponsePromise = answers.executeVerticalQuery();
    answers.setQuery(queries[1]);
    const secondResponsePromise = answers.executeVerticalQuery();
    answers.setQuery(queries[2]);
    const thirdResponsePromise = answers.executeVerticalQuery();

    jest.advanceTimersByTime(requestsTime[queries[1]]);
    await secondResponsePromise;
    expect(answers.state.vertical.results).toEqual([queries[1]]);
    jest.advanceTimersByTime(requestsTime[queries[2]]);
    await thirdResponsePromise;
    jest.runAllTimers();
    await firstResponsePromise;

    expect(answers.state.query.input).toEqual(queries[2]);
    expect(answers.state.vertical.results).toEqual([queries[2]]);
    expect(updateResult.mock.calls).toHaveLength(2);
  });

  it('universal search get correct results based on up-to-date response', async () => {
    const answers = getAnswersHeadless(requestsTime);
    answers.setUniversal();
    answers.addListener({
      valueAccessor: state => state.universal.verticals,
      callback: updateResult
    });
    answers.setQuery(queries[0]);
    const firstResponsePromise = answers.executeUniversalQuery();
    answers.setQuery(queries[1]);
    const secondResponsePromise = answers.executeUniversalQuery();
    answers.setQuery(queries[2]);
    const thirdResponsePromise = answers.executeUniversalQuery();

    jest.advanceTimersByTime(requestsTime[queries[1]]);
    await secondResponsePromise;
    expect(answers.state.universal.verticals).toEqual([{ results: [queries[1]] }]);
    jest.advanceTimersByTime(requestsTime[queries[2]]);
    await thirdResponsePromise;
    jest.runAllTimers();
    await firstResponsePromise;

    expect(answers.state.query.input).toEqual(queries[2]);
    expect(answers.state.universal.verticals).toEqual([{ results: [queries[2]] }]);
    expect(updateResult.mock.calls).toHaveLength(2);
  });
});

function getAnswersHeadless(requestsTime: { [x: string]: number }) {
  const mockedCore: any = {
    verticalSearch: jest.fn( async (request: VerticalSearchRequest) => {
      const waitTime = requestsTime[request.query];
      return new Promise(res => setTimeout(() => res(
        { verticalResults: { results: [request.query] } }), waitTime));
    }),
    universalSearch: jest.fn( async (request: UniversalSearchRequest) => {
      const waitTime = requestsTime[request.query];
      return new Promise(res => setTimeout(() => res(
        { verticalResults: [{ results: [request.query] }] }), waitTime));
    })
  };
  const stateManager = new ReduxStateManager(
    createBaseStore(), DEFAULT_HEADLESS_ID, new HeadlessReducerManager());
  const httpManager = new HttpManager();
  return new AnswersHeadless(mockedCore, stateManager, httpManager);
}
