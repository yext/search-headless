import { QuerySource, QueryTrigger } from '@yext/search-core';
import createQuerySlice from '../../../src/slices/query';

const { reducer, actions } = createQuerySlice('');
const { setInput, setIsPagination, setQueryId, setSource, setTrigger } = actions;

describe('query slice reducer works as expected', () => {
  it('setQuery action is handled properly', () => {
    const searchTerm = 'search term';
    const expectedState = { input: searchTerm };
    const actualState = reducer({}, setInput(searchTerm));

    expect(actualState).toEqual(expectedState);
  });

  it('setIsPagination action is handled properly', () => {
    const isPagination = true;
    const expectedState = { isPagination };
    const actualState = reducer({}, setIsPagination(isPagination));

    expect(actualState).toEqual(expectedState);
  });

  it('setTrigger action is handled properly', () => {
    const queryTrigger = QueryTrigger.Initialize;
    const expectedState = { queryTrigger };
    const actualState = reducer({}, setTrigger(queryTrigger));

    expect(actualState).toEqual(expectedState);
  });

  it('setSource action is handled properly', () => {
    const querySource = QuerySource.Overlay;
    const expectedState = { querySource };
    const actualState = reducer({}, setSource(querySource));

    expect(actualState).toEqual(expectedState);
  });

  it('setQueryId action is handled properly', () => {
    const queryId = 'some-id';
    const expectedState = { queryId };
    const actualState = reducer({}, setQueryId(queryId));

    expect(actualState).toEqual(expectedState);
  });
});
