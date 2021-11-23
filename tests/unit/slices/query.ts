import { QuerySource, QueryTrigger } from '@yext/answers-core';
import createQuerySlice from '../../../src/slices/query';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'some-uuid-value')
}));

const { reducer, actions } = createQuerySlice('');
const { 
  setInput,
  setQueryId,
  setSource,
  setTrigger,
  setSearchAggregationEnabled,
  setSearchAggregationId
} = actions;

describe('query slice reducer works as expected', () => {
  it('setQuery action is handled properly', () => {
    const searchTerm = 'search term';
    const expectedState = { input: searchTerm };
    const actualState = reducer({}, setInput(searchTerm));

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

  it('setSearchAggregationEnabled action is handled properly when set to false', () => {
    const expectedState = { 
      searchAggregation: {
        enabled: false,
        id: undefined
      }
    };
    const actualState = reducer({}, setSearchAggregationEnabled(false));
    expect(actualState).toEqual(expectedState);
  });

  it('setSearchAggregationEnabled action is handled properly when set to true', () => {
    const expectedState = { 
      searchAggregation: {
        enabled: true,
        id: 'some-uuid-value'
      }
    };
    const actualState = reducer({}, setSearchAggregationEnabled(true));
    expect(actualState).toEqual(expectedState);
  });

  it('setSearchAggregationId action is handled properly', () => {
    const initalState = {
      searchAggregation: {
        enabled: true,
        id: 'very-old-uuid-value'
      }
    };
    const expectedState = {
      searchAggregation: {
        enabled: true,
        id: 'some-uuid-value'
      }
    };
    const actualState = reducer(initalState, setSearchAggregationId('some-uuid-value'));
    expect(actualState).toEqual(expectedState);
  });

  it('setSearchAggregationId action is handled properly when searchAggregation is never set', () => {
    const consoleErrorSpy = jest.spyOn(global.console, 'error').mockImplementation();
    const actualState = reducer({}, setSearchAggregationId('some-uuid-value'));
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    consoleErrorSpy.mockClear();
    expect(actualState).toEqual({});
  });
});