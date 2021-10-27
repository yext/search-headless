import { SearchIntent } from '@yext/answers-core';
import createUniversalSlice from '../../../src/slices/universal';

const { reducer, actions } = createUniversalSlice('');
const { setAutoComplete, setResults } = actions;

describe('universal slice reducer works as expected', () => {
  it('setResults action is handled properly', () => {
    const searchResponse = {
      verticalResults: [],
      uuid: '1234'
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
});