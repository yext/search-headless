import { Result, SearchIntent, Source } from '@yext/answers-core';
import createVerticalSlice from '../../../src/slices/vertical';

const { reducer, actions } = createVerticalSlice('');
const { setAutoComplete, setVerticalKey, setResults, setLimit, setOffset, setDisplayName } = actions;

describe('vertical slice reducer works as expected', () => {
  it('setVerticalKey action is handled properly', () => {
    const verticalKey = 'someKey';
    const expectedState = { verticalKey };
    const actualState = reducer({}, setVerticalKey(verticalKey));

    expect(actualState).toEqual(expectedState);
  });

  it('setResults action is handled properly', () => {
    const mockResults: Result[] = [{
      rawData: { test: 'hello' },
      source: Source.KnowledgeManager
    }];
    const expectedState = { results: mockResults };
    const actualState = reducer({}, setResults(mockResults));

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