import { SearchIntent, Source } from '@yext/answers-core';
import reducer, { setAutoComplete, setKey, setResults, setRequest } from '../../src/slices/vertical';

describe('vertical slice reducer works as expected', () => {
  it('setKey action is handled properly', () => {
    const verticalKey = 'someKey';
    const expectedState = { key: verticalKey };
    const actualState = reducer({}, setKey(verticalKey));

    expect(actualState).toEqual(expectedState);
  });

  it('setResults action is handled properly', () => {
    const searchResponse = {
      verticalResults: {
        results: [],
        resultsCount: 0,
        source: Source.Generic,
        appliedQueryFilters: [],
        queryDurationMillis: 1000,
        verticalKey: 'someKey'
      },
      uuid: '1234',
      queryId: 'some-query'
    };
    const expectedState = { results: searchResponse };
    const actualState = reducer({}, setResults(searchResponse));

    expect(actualState).toEqual(expectedState);
  });

  it('setAutoComplete action is handled properly', () => {
    const autoCompleteResponse = {
      results: [],
      inputIntents: [SearchIntent.NearMe],
      uuid: '1234'
    };
    const expectedState = { autoComplete: autoCompleteResponse };
    const actualState = reducer({}, setAutoComplete(autoCompleteResponse));

    expect(actualState).toEqual(expectedState);
  });

  it('setRequest action is handled properly', () => {
    const verticalRequest = {
      query: 'tom',
      verticalKey: 'people',
      limit: 20,
      offset: 0
    };
    const expectedState = { request: verticalRequest };
    const actualState = reducer({}, setRequest(verticalRequest));

    expect(actualState).toEqual(expectedState);
  });
});