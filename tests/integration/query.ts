import {
  VerticalSearchRequest,
  UniversalSearchRequest,
  SearchIntent,
  VerticalAutocompleteRequest,
  UniversalAutocompleteRequest
} from '@yext/answers-core';
import HttpManager from '../../src/http-manager';
import ReduxStateManager from '../../src/redux-state-manager';
import StatefulCore from '../../src/stateful-core';
import { createMockedStatefulCore } from '../mocks/createMockedStatefulCore';

it('vertical searches set search intents', async () => {
  const mockSearch = jest.fn((_request: VerticalSearchRequest) => Promise.resolve({
    searchIntents: [SearchIntent.NearMe]
  }));
  const statefulCore = createMockedStatefulCore({
    verticalSearch: mockSearch
  });
  statefulCore.setVerticalKey('vertical-key');
  expect(statefulCore.state.query.searchIntents).toEqual(undefined);
  await statefulCore.executeVerticalQuery();
  expect(statefulCore.state.query.searchIntents).toEqual(['NEAR_ME']);
});

it('universal searches set search intents', async () => {
  const mockSearch = jest.fn((_request: UniversalSearchRequest) => Promise.resolve({
    searchIntents: [SearchIntent.NearMe]
  }));
  const statefulCore = createMockedStatefulCore({
    universalSearch: mockSearch
  });
  expect(statefulCore.state.query.searchIntents).toEqual(undefined);
  await statefulCore.executeUniversalQuery();
  expect(statefulCore.state.query.searchIntents).toEqual(['NEAR_ME']);
});


it('vertical autocomplete sets search intents', async () => {
  const statefulCore = createMockedStatefulCore({
    verticalAutocomplete: jest.fn((_request: VerticalAutocompleteRequest) => Promise.resolve({
      inputIntents: [SearchIntent.NearMe]
    }))
  });
  statefulCore.setVerticalKey('vertical-key');
  expect(statefulCore.state.query.searchIntents).toEqual(undefined);
  await statefulCore.executeVerticalAutoComplete();
  expect(statefulCore.state.query.searchIntents).toEqual(['NEAR_ME']);
});

it('universal autocomplete sets search intents', async () => {
  const statefulCore = createMockedStatefulCore({
    universalAutocomplete: jest.fn((_request: UniversalAutocompleteRequest) => Promise.resolve({
      inputIntents: [SearchIntent.NearMe]
    }))
  });
  expect(statefulCore.state.query.searchIntents).toEqual(undefined);
  await statefulCore.executeUniversalAutoComplete();
  expect(statefulCore.state.query.searchIntents).toEqual(['NEAR_ME']);
});


describe('ensure correct results from latest request', () => {
  jest.useFakeTimers();
  const mockAutoCompleteFn = jest.fn(
    async (request: VerticalAutocompleteRequest | UniversalAutocompleteRequest) => {
      const waitTime = request.input?.length;
      return new Promise(res => setTimeout(() => res({ results: [ {value: request.input} ]}), waitTime));
    }
  );

  const mockedCore: any = {
    verticalAutocomplete: mockAutoCompleteFn,
    universalAutocomplete: mockAutoCompleteFn,
    verticalSearch: jest.fn( async (request: VerticalSearchRequest) => {
      const waitTime = request.query?.length;
      return new Promise(res => setTimeout(() => res(
        { verticalResults: { results: [request.query] } }), waitTime));
    }),
    universalSearch: jest.fn( async (request: UniversalSearchRequest) => {
      const waitTime = request.query?.length;
      return new Promise(res => setTimeout(() => res(
        { verticalResults: [{ results: [request.query] }] }), waitTime));
    })
  };
  const stateManager = new ReduxStateManager();
  const httpManager = new HttpManager();
  const statefulCore = new StatefulCore(mockedCore, stateManager, httpManager);
  statefulCore.setVerticalKey('someKey');
  const queries = ['really long request', 'short', 'long request'];
  const updateResult = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('vertical autocomplete get correct results based on up-to-date response', async () => {
    statefulCore.addListener({
      valueAccessor: state => state.vertical?.autoComplete?.results,
      callback: updateResult
    });

    statefulCore.setQuery(queries[0]);
    const firstResponsePromise = statefulCore.executeVerticalAutoComplete();
    statefulCore.setQuery(queries[1]);
    const secondResponsePromise = statefulCore.executeVerticalAutoComplete();
    statefulCore.setQuery(queries[2]);
    const thirdResponsePromise = statefulCore.executeVerticalAutoComplete();

    jest.advanceTimersByTime(queries[1].length);
    await secondResponsePromise;
    expect(statefulCore.state.vertical.autoComplete.results).toEqual([{ value: queries[1] }]);
    jest.advanceTimersByTime(queries[2].length);
    await thirdResponsePromise;
    jest.runAllTimers();
    await firstResponsePromise;

    expect(statefulCore.state.query.query).toEqual(queries[2]);
    expect(statefulCore.state.vertical.autoComplete.results).toEqual([{ value: queries[2] }]);
    expect(updateResult.mock.calls).toHaveLength(2);
  });

  it('universal autocomplete get correct results based on up-to-date response', async () => {
    statefulCore.addListener({
      valueAccessor: state => state.universal?.autoComplete?.results,
      callback: updateResult
    });
    statefulCore.setQuery(queries[0]);
    const firstResponsePromise = statefulCore.executeUniversalAutoComplete();
    statefulCore.setQuery(queries[1]);
    const secondResponsePromise = statefulCore.executeUniversalAutoComplete();
    statefulCore.setQuery(queries[2]);
    const thirdResponsePromise = statefulCore.executeUniversalAutoComplete();

    jest.advanceTimersByTime(queries[1].length);
    await secondResponsePromise;
    expect(statefulCore.state.universal.autoComplete.results).toEqual([{ value: queries[1] }]);
    jest.advanceTimersByTime(queries[2].length);
    await thirdResponsePromise;
    jest.runAllTimers();
    await firstResponsePromise;

    expect(statefulCore.state.query.query).toEqual(queries[2]);
    expect(statefulCore.state.universal.autoComplete.results).toEqual([{ value: queries[2] }]);
    expect(updateResult.mock.calls).toHaveLength(2);
  });

  it('vertical search get correct results based on up-to-date response', async () => {
    statefulCore.addListener({
      valueAccessor: state => state.vertical?.results,
      callback: updateResult
    });
    statefulCore.setQuery(queries[0]);
    const firstResponsePromise = statefulCore.executeVerticalQuery();
    statefulCore.setQuery(queries[1]);
    const secondResponsePromise = statefulCore.executeVerticalQuery();
    statefulCore.setQuery(queries[2]);
    const thirdResponsePromise = statefulCore.executeVerticalQuery();

    jest.advanceTimersByTime(queries[1].length);
    await secondResponsePromise;
    expect(statefulCore.state.vertical.results.verticalResults).toEqual({ results: [queries[1]] });
    jest.advanceTimersByTime(queries[2].length);
    await thirdResponsePromise;
    jest.runAllTimers();
    await firstResponsePromise;

    expect(statefulCore.state.query.query).toEqual(queries[2]);
    expect(statefulCore.state.vertical.results.verticalResults).toEqual({ results: [queries[2]] });
    expect(updateResult.mock.calls).toHaveLength(2);
  });

  it('universal search get correct results based on up-to-date response', async () => {
    statefulCore.addListener({
      valueAccessor: state => state.universal?.results,
      callback: updateResult
    });
    statefulCore.setQuery(queries[0]);
    const firstResponsePromise = statefulCore.executeUniversalQuery();
    statefulCore.setQuery(queries[1]);
    const secondResponsePromise = statefulCore.executeUniversalQuery();
    statefulCore.setQuery(queries[2]);
    const thirdResponsePromise = statefulCore.executeUniversalQuery();

    jest.advanceTimersByTime(queries[1].length);
    await secondResponsePromise;
    expect(statefulCore.state.universal.results.verticalResults).toEqual([{ results: [queries[1]] }]);
    jest.advanceTimersByTime(queries[2].length);
    await thirdResponsePromise;
    jest.runAllTimers();
    await firstResponsePromise;

    expect(statefulCore.state.query.query).toEqual(queries[2]);
    expect(statefulCore.state.universal.results.verticalResults).toEqual([{ results: [queries[2]] }]);
    expect(updateResult.mock.calls).toHaveLength(2);
  });
});
