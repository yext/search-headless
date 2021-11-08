import createFilterSearchSlice from '../../../src/slices/filtersearch';

const { actions, reducer } = createFilterSearchSlice('');
const { setQuery, setResults } = actions;

describe('filter slice reducer works as expected', () => {
  it('setQuery action is handled properly with invalid filterSearchId', () => {
    const filterSearchQuery = {
      query: 'someQuery',
      filterSearchId: ''
    };
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const actualState = reducer({}, setQuery(filterSearchQuery));
    expect(actualState).toEqual({});
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenLastCalledWith(
      expect.stringContaining('invalid filterSearch id')
    );
    consoleWarnSpy.mockClear();
  });

  it('setQuery action is handled properly with new unregistered filterSearchId', () => {
    const filterSearchQuery = {
      query: 'someQuery',
      filterSearchId: 'newId'
    };
    const actualState = reducer({}, setQuery(filterSearchQuery));
    const expectedState = {
      newId: {
        query: filterSearchQuery.query
      }
    };
    expect(actualState).toEqual(expectedState);
  });

  it('setQuery action is handled properly with registered filterSearchId', () => {
    const filterSearchQuery = {
      query: 'someQuery',
      filterSearchId: 'someId'
    };
    const initialState = {
      someId: {
        query: 'previousQuery'
      }
    };
    const actualState = reducer(initialState, setQuery(filterSearchQuery));
    const expectedState = {
      someId: {
        query: filterSearchQuery.query
      }
    };
    expect(actualState).toEqual(expectedState);
  });

  it('setResults action is handled properly', () => {
    const filterSearchResults = {
      filterSearchId: 'someId',
      results: {
        sectioned: true,
        sections: [],
        results: [],
        inputIntents: [],
        uuid: ''
      }
    };
    const initialState = {
      someId: {
        query: 'previousQuery'
      }
    };
    const actualState = reducer(initialState, setResults(filterSearchResults));
    const expectedState = {
      someId: {
        query: initialState.someId.query,
        ...filterSearchResults.results
      }
    };
    expect(actualState).toEqual(expectedState);
  });
});