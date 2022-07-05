import {
  VerticalSearchRequest,
  UniversalSearchRequest,
  SearchIntent
} from '@yext/search-core';
import HttpManager from '../../src/http-manager';
import ReduxStateManager from '../../src/redux-state-manager';
import SearchHeadless from '../../src/search-headless';
import { createMockedSearchHeadless } from '../mocks/createMockedSearchHeadless';
import { createBaseStore } from '../../src/store';
import { DEFAULT_HEADLESS_ID } from '../../src/constants';
import HeadlessReducerManager from '../../src/headless-reducer-manager';

it('vertical searches set search intents', async () => {
  const mockSearch = jest.fn((_request: VerticalSearchRequest) => Promise.resolve({
    searchIntents: [SearchIntent.NearMe]
  }));
  const search = createMockedSearchHeadless({
    verticalSearch: mockSearch
  });
  search.setVertical('vertical-key');
  expect(search.state.query.searchIntents).toEqual(undefined);
  await search.executeVerticalQuery();
  expect(search.state.query.searchIntents).toEqual(['NEAR_ME']);
});

it('universal searches set search intents', async () => {
  const mockSearch = jest.fn((_request: UniversalSearchRequest) => Promise.resolve({
    searchIntents: [SearchIntent.NearMe]
  }));
  const search = createMockedSearchHeadless({
    universalSearch: mockSearch
  });
  expect(search.state.query.searchIntents).toEqual(undefined);
  await search.executeUniversalQuery();
  expect(search.state.query.searchIntents).toEqual(['NEAR_ME']);
});

describe('sessionId to request works as expected', () => {
  const verticalMockSearch = jest.fn().mockReturnValue({});
  const universalMockSearch = jest.fn().mockReturnValue({});
  const search = createMockedSearchHeadless({
    verticalSearch: verticalMockSearch,
    universalSearch: universalMockSearch
  });
  search.setVertical('vertical-key');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sessionId is in request when sessionTrackingEnabled is true', async () => {
    search.setSessionTrackingEnabled(true);
    search.setSessionId('some-session-id');

    search.setVertical('vertical-key');
    await search.executeVerticalQuery();
    search.setUniversal();
    await search.executeUniversalQuery();
    expect(verticalMockSearch.mock.calls[0][0])
      .toEqual(expect.objectContaining({ sessionId: 'some-session-id' }));
    expect(universalMockSearch.mock.calls[0][0])
      .toEqual(expect.objectContaining({ sessionId: 'some-session-id' }));
  });

  it('sessionId is not in request when sessionTrackingEnabled is false', async () => {
    search.setSessionTrackingEnabled(false);
    search.setSessionId('some-session-id');

    search.setVertical('vertical-key');
    await search.executeVerticalQuery();
    search.setUniversal();
    await search.executeUniversalQuery();

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
    const search = getSearchHeadless(requestsTime);
    search.setVertical('someKey');
    search.addListener({
      valueAccessor: state => state.vertical?.results,
      callback: updateResult
    });
    search.setQuery(queries[0]);
    const firstResponsePromise = search.executeVerticalQuery();
    search.setQuery(queries[1]);
    const secondResponsePromise = search.executeVerticalQuery();
    search.setQuery(queries[2]);
    const thirdResponsePromise = search.executeVerticalQuery();

    jest.advanceTimersByTime(requestsTime[queries[1]]);
    await secondResponsePromise;
    expect(search.state.vertical.results).toEqual([queries[1]]);
    jest.advanceTimersByTime(requestsTime[queries[2]]);
    await thirdResponsePromise;
    jest.runAllTimers();
    await firstResponsePromise;

    expect(search.state.query.input).toEqual(queries[2]);
    expect(search.state.vertical.results).toEqual([queries[2]]);
    expect(updateResult.mock.calls).toHaveLength(2);
  });

  it('universal search get correct results based on up-to-date response', async () => {
    const search = getSearchHeadless(requestsTime);
    search.setUniversal();
    search.addListener({
      valueAccessor: state => state.universal.verticals,
      callback: updateResult
    });
    search.setQuery(queries[0]);
    const firstResponsePromise = search.executeUniversalQuery();
    search.setQuery(queries[1]);
    const secondResponsePromise = search.executeUniversalQuery();
    search.setQuery(queries[2]);
    const thirdResponsePromise = search.executeUniversalQuery();

    jest.advanceTimersByTime(requestsTime[queries[1]]);
    await secondResponsePromise;
    expect(search.state.universal.verticals).toEqual([{ results: [queries[1]] }]);
    jest.advanceTimersByTime(requestsTime[queries[2]]);
    await thirdResponsePromise;
    jest.runAllTimers();
    await firstResponsePromise;

    expect(search.state.query.input).toEqual(queries[2]);
    expect(search.state.universal.verticals).toEqual([{ results: [queries[2]] }]);
    expect(updateResult.mock.calls).toHaveLength(2);
  });
});

function getSearchHeadless(requestsTime: { [x: string]: number }) {
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
  return new SearchHeadless(mockedCore, stateManager, httpManager);
}
