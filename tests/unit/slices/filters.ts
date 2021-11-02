import { Filter, Matcher } from '@yext/answers-core';
import { SelectableFilter } from '../../../src/models/utils/selectablefilter';
import createFiltersSlice from '../../../src/slices/filters';
import _ from 'lodash';

const { actions, reducer } = createFiltersSlice('');
const { setStatic, setFacets, resetFacets, addFilters, toggleFilterOption } = actions;

describe('filter slice reducer works as expected', () => {

  const filter: Filter = {
    fieldId: 'someField',
    value: 'some value',
    matcher: Matcher.Equals
  };
  const selectableFilter: SelectableFilter = {
    filter: filter,
    selected: false
  };

  const initialState = {
    static: {
      someId: [
        {
          filter: {
            fieldId: 'id1',
            matcher: Matcher.Equals,
            value: 'value1'
          },
          selected: true
        },
        {
          filter: {
            fieldId: 'id2',
            matcher: Matcher.Equals,
            value: 'value2'
          },
          selected: true
        },
        {
          filter: {
            fieldId: 'id3',
            matcher: Matcher.Equals,
            value: 'value3'
          },
          selected: false
        }
      ]
    }
  };

  it('setStatic action is handled properly', () => {
    const staticFilter = {
      someId: [selectableFilter]
    };
    const actualState = reducer({}, setStatic(staticFilter));
    const expectedState = {
      static: staticFilter
    };

    expect(actualState).toEqual(expectedState);
  });

  it('addFilters action is handled properly', () => {
    const firstStaticFilters = {
      filterSetId: 'someId',
      filters: [selectableFilter]
    };
    const SecondStaticFilters = {
      filterSetId: 'anotherId',
      filters: [selectableFilter, selectableFilter]
    };

    let actualState = reducer({}, addFilters(firstStaticFilters));
    const firstExpectedState = {
      static: {
        someId: [selectableFilter]
      }
    };
    expect(actualState).toEqual(firstExpectedState);
    actualState = reducer(firstExpectedState, addFilters(SecondStaticFilters));
    const secondExpectedState = {
      static: {
        someId: [selectableFilter],
        anotherId: [selectableFilter, selectableFilter]
      }
    };
    expect(actualState).toEqual(secondExpectedState);
  });

  it('toggleFilterOption action is handled properly with no static state', () => {
    const unselectFilterPayload = {
      filterSetId: 'someId',
      filter: {
        fieldId: 'id2',
        matcher: Matcher.Equals,
        value: 'value2'
      },
      shouldSelect: false
    };
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const actualState = reducer({}, toggleFilterOption(unselectFilterPayload));
    expect(actualState).toEqual({});
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    consoleWarnSpy.mockClear();
  });

  it('toggleFilterOption action is handled properly with invalid filterSetId', () => {
    const unselectFilterPayload = {
      filterSetId: 'invalidId',
      filter: {
        fieldId: 'id2',
        matcher: Matcher.Equals,
        value: 'value2'
      },
      shouldSelect: false
    };
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const actualState = reducer(initialState, toggleFilterOption(unselectFilterPayload));
    expect(actualState).toEqual(initialState);
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenLastCalledWith(
      expect.stringContaining('invalid static filters id')
    );
    consoleWarnSpy.mockClear();
  });

  it('toggleFilterOption action is handled properly, with valid filterSetId', () => {
    const unselectFilterPayload = {
      filterSetId: 'someId',
      filter: {
        fieldId: 'id2',
        matcher: Matcher.Equals,
        value: 'value2'
      },
      shouldSelect: false
    };

    const selectFilterPayload = {
      filterSetId: 'someId',
      filter: {
        fieldId: 'id3',
        matcher: Matcher.Equals,
        value: 'value3'
      },
      shouldSelect: true
    };

    let actualState = reducer(initialState, toggleFilterOption(unselectFilterPayload));
    const unselectExpectedState = _.cloneDeep(initialState);
    unselectExpectedState.static.someId[1].selected = false;
    expect(actualState).toEqual(unselectExpectedState);

    actualState = reducer(initialState, toggleFilterOption(selectFilterPayload));
    const selecteExpectedState = _.cloneDeep(initialState);
    selecteExpectedState.static.someId[2].selected = true;
    expect(actualState).toEqual(selecteExpectedState);
  });

  it('toggleFilterOption action is handled properly, with no filterSetId', () => {
    const unselectFilterPayload = {
      filter: {
        fieldId: 'id2',
        matcher: Matcher.Equals,
        value: 'value2'
      },
      shouldSelect: false
    };

    const selectFilterPayload = {
      filter: {
        fieldId: 'id3',
        matcher: Matcher.Equals,
        value: 'value3'
      },
      shouldSelect: true
    };

    let actualState = reducer(initialState, toggleFilterOption(unselectFilterPayload));
    const unselectExpectedState = _.cloneDeep(initialState);
    unselectExpectedState.static.someId[1].selected = false;
    expect(actualState).toEqual(unselectExpectedState);

    actualState = reducer(initialState, toggleFilterOption(selectFilterPayload));
    const selecteExpectedState = _.cloneDeep(initialState);
    selecteExpectedState.static.someId[2].selected = true;
    expect(actualState).toEqual(selecteExpectedState);
  });

  it('toggleFilterOption action is handled properly with filter not found', () => {
    const unselectFilterPayload = {
      filter: {
        fieldId: 'invalid field',
        matcher: Matcher.Equals,
        value: 'invalid value'
      },
      shouldSelect: false
    };
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const actualState = reducer(initialState, toggleFilterOption(unselectFilterPayload));
    expect(actualState).toEqual(initialState);
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenLastCalledWith(
      expect.stringContaining('Could not select a filter option with following fields')
    );
    consoleWarnSpy.mockClear();
  });

  it('setFacets action is handled properly', () => {
    const facets = [
      {
        fieldId: 'someField',
        displayName: 'Some Field',
        options: [{
          matcher: Matcher.Equals,
          value: 'someValue',
          displayName: 'Some Value',
          count: 1,
          selected: true
        }]
      }
    ];

    const actualState = reducer({}, setFacets(facets));
    const expectedState = {
      facets: facets
    };

    expect(actualState).toEqual(expectedState);
  });

  it('resetFacets action is handled properly', () => {
    const facets = [
      {
        fieldId: 'someField',
        displayName: 'Some Field',
        options: [{
          matcher: Matcher.Equals,
          value: 'someValue',
          displayName: 'Some Value',
          count: 1,
          selected: true
        }]
      },
      {
        fieldId: 'someField2',
        displayName: 'Some Field 2',
        options: [{
          matcher: Matcher.Equals,
          value: 'someValue2',
          displayName: 'Some Value 2',
          count: 2,
          selected: true
        }]
      }
    ];

    const initialState = {
      facets: facets
    };

    const actualState = reducer(initialState, resetFacets());
    const unselectedFacets = {
      facets: [
        { options: [{ selected: false }] },
        { options: [{ selected: false }] },
      ]
    };
    const expectedState = _.merge(_.cloneDeep(initialState), unselectedFacets);
    expect(actualState).toEqual(expectedState);
  });
});