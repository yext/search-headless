import { Filter, Matcher } from '@yext/answers-core';
import { SelectableFilter } from '../../../src/models/utils/selectablefilter';
import createFiltersSlice from '../../../src/slices/filters';
import _ from 'lodash';

const { actions, reducer } = createFiltersSlice('');
const { setStatic, setFacets, resetFacets, toggleFilterOption } = actions;

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

  it('toggleFilterOption action is handled properly with no static state', () => {
    const unselectFilterPayload = {
      filterCollectionId: 'someId',
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

  it('toggleFilterOption action is handled properly with unknown filterCollectionId on unselect', () => {
    const unselectFilterPayload = {
      filterCollectionId: 'invalidId',
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

  it('toggleFilterOption action is handled properly with unknown filterCollectionId on select', () => {
    const selectFilterPayload = {
      filterCollectionId: 'newId',
      filter: {
        fieldId: 'id2',
        matcher: Matcher.Equals,
        value: 'value2'
      },
      shouldSelect: true
    };
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const actualState = reducer(initialState, toggleFilterOption(selectFilterPayload));
    const selectExpectedState = _.cloneDeep(initialState);
    selectExpectedState.static['newId'] = [{filter: selectFilterPayload.filter, selected: true}];
    expect(actualState).toEqual(selectExpectedState);
    expect(consoleWarnSpy).toHaveBeenCalledTimes(0);
    consoleWarnSpy.mockClear();
  });

  it('toggleFilterOption action is handled properly with empty string for filterCollectionId', () => {
    const selectFilterPayload = {
      filterCollectionId: '',
      filter: {
        fieldId: 'id2',
        matcher: Matcher.Equals,
        value: 'value2'
      },
      shouldSelect: true
    };
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const actualState = reducer(initialState, toggleFilterOption(selectFilterPayload));
    expect(actualState).toEqual(initialState);
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).toHaveBeenLastCalledWith(
      expect.stringContaining('invalid static filters id')
    );
    consoleWarnSpy.mockClear();
  });

  it('toggleFilterOption action is handled properly, with valid filterCollectionId', () => {
    const unselectFilterPayload = {
      filterCollectionId: 'someId',
      filter: {
        fieldId: 'id2',
        matcher: Matcher.Equals,
        value: 'value2'
      },
      shouldSelect: false
    };

    const selectFilterPayload = {
      filterCollectionId: 'someId',
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

  it('toggleFilterOption action is handled properly with a non-existing filter in state when select', () => {
    const selectFilterPayload = {
      filterCollectionId: 'someId',
      filter: {
        fieldId: 'invalid field',
        matcher: Matcher.Equals,
        value: 'invalid value'
      },
      shouldSelect: true
    };
    const actualState = reducer(initialState, toggleFilterOption(selectFilterPayload));
    const selecteExpectedState = _.cloneDeep(initialState);
    selecteExpectedState.static.someId.push({
      filter: {
        fieldId: 'invalid field',
        matcher: Matcher.Equals,
        value: 'invalid value'
      },
      selected: true
    });
    expect(actualState).toEqual(selecteExpectedState);
  });

  it('toggleFilterOption action is handled properly with filter not found when unselect', () => {
    const unselectFilterPayload = {
      filterCollectionId: 'someId',
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
      expect.stringContaining('Could not unselect a non-existing filter option in state')
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