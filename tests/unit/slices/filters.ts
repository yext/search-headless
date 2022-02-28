import { Filter, Matcher } from '@yext/answers-core';
import { DisplayableFilter } from '../../../src/models/utils/displayableFilter';
import createFiltersSlice from '../../../src/slices/filters';
import _ from 'lodash';
import { FiltersState } from '../../../src';

const { actions, reducer } = createFiltersSlice('');
const { setStatic, setFacets, resetFacets, setFilterOption } = actions;

describe('filter slice reducer works as expected', () => {

  const filter: Filter = {
    fieldId: 'someField',
    value: 'some value',
    matcher: Matcher.Equals
  };
  const displayableFilter: DisplayableFilter = {
    ...filter,
    selected: false,
    displayName: 'some label'
  };

  const initialState: FiltersState = {
    static: [
      {
        fieldId: 'id1',
        matcher: Matcher.Equals,
        value: 'value1',
        selected: true,
        displayName: 'label1'
      },
      {
        fieldId: 'id2',
        matcher: Matcher.Equals,
        value: 'value2',
        selected: true,
        displayName: 'label2'
      },
      {
        fieldId: 'id3',
        matcher: Matcher.Equals,
        value: 'value3',
        selected: false,
        displayName: 'label3'
      }
    ]
  };

  it('setStatic action is handled properly', () => {
    const staticFilter = [displayableFilter];
    const actualState = reducer({}, setStatic(staticFilter));
    const expectedState = {
      static: staticFilter
    };

    expect(actualState).toEqual(expectedState);
  });

  it('setFilterOption action is handled properly with no static state', () => {
    const unselectFilterPayload = {
      filter: {
        fieldId: 'id2',
        matcher: Matcher.Equals,
        value: 'value2'
      },
      shouldSelect: true,
      displayName: 'label2'
    };
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const actualState = reducer({}, setFilterOption(unselectFilterPayload));
    const expectedState: FiltersState = {
      static: [{
        ...unselectFilterPayload.filter,
        displayName: unselectFilterPayload.displayName,
        selected: true,
      }]
    };
    expect(actualState).toEqual(expectedState);
    expect(consoleWarnSpy).toHaveBeenCalledTimes(0);
    consoleWarnSpy.mockClear();
  });

  it('setFilterOption action is handled properly with existing filters', () => {
    const unselectFilterPayload = {
      filter: {
        fieldId: 'id2',
        matcher: Matcher.Equals,
        value: 'value2'
      },
      shouldSelect: false,
      displayName: 'label2'
    };

    const selectFilterPayload = {
      filter: {
        fieldId: 'id3',
        matcher: Matcher.Equals,
        value: 'value3'
      },
      shouldSelect: true,
      displayName: 'label3'
    };

    let actualState = reducer(initialState, setFilterOption(unselectFilterPayload));
    const unselectExpectedState = _.cloneDeep(initialState);
    unselectExpectedState.static[1].selected = false;
    expect(actualState).toEqual(unselectExpectedState);

    actualState = reducer(initialState, setFilterOption(selectFilterPayload));
    const selectedExpectedState = _.cloneDeep(initialState);
    selectedExpectedState.static[2].selected = true;
    expect(actualState).toEqual(selectedExpectedState);
  });

  it('setFilterOption action is handled properly with filter not found in state when select', () => {
    const selectFilterPayload = {
      filter: {
        fieldId: 'invalid field',
        matcher: Matcher.Equals,
        value: 'invalid value'
      },
      shouldSelect: true,
      displayName: 'invalid label'
    };
    const actualState = reducer(initialState, setFilterOption(selectFilterPayload));
    const selectedExpectedState = _.cloneDeep(initialState);
    selectedExpectedState.static.push({
      ...selectFilterPayload.filter,
      displayName: selectFilterPayload.displayName,
      selected: true
    });
    expect(actualState).toEqual(selectedExpectedState);
  });

  it('setFilterOption action is handled properly with filter not found in state when unselect', () => {
    const unselectFilterPayload = {
      filter: {
        fieldId: 'invalid field',
        matcher: Matcher.Equals,
        value: 'invalid value'
      },
      shouldSelect: false,
      displayName: 'invalid label'
    };
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const actualState = reducer(initialState, setFilterOption(unselectFilterPayload));
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