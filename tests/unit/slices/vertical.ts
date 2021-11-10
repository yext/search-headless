import { Source } from '@yext/answers-core';
import createVerticalSlice from '../../../src/slices/vertical';

const { reducer, actions } = createVerticalSlice('');
const { setKey, setResults, setLimit, setOffset, setDisplayName } = actions;

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

  it('setLimit action is handled properly', () => {
    const limit = 17;
    const expectedState = { limit: limit };
    const actualState = reducer({}, setLimit(limit));

    expect(actualState).toEqual(expectedState);
  });

  it('setOffset action is handled properly', () => {
    const offset = 4;
    const expectedState = { offset: offset };
    const actualState = reducer({}, setOffset(offset));

    expect(actualState).toEqual(expectedState);
  });

  it('setDisplayName action is handled properly', () => {
    const displayName = 'a display name';
    const expectedState = { displayName };
    const actualState = reducer({}, setDisplayName(displayName));

    expect(actualState).toEqual(expectedState);
  });
});