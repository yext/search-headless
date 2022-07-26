import { CombinedFilter, DisplayableFacetOption, Filter, FilterCombinator, Matcher } from '@yext/search-core';
import createFiltersSlice from '../../../src/slices/filters';
import _ from 'lodash';
import { FiltersState, SelectableCombinedFilter, SelectableFilter } from '../../../src';

const { actions, reducer } = createFiltersSlice('');
const { setStatic, setFacets, resetFacets, setFilterOption, setFacetOption } = actions;

describe('filter slice reducer works as expected', () => {

  const filter: Filter = {
    fieldId: 'someField',
    value: 'some value',
    matcher: Matcher.Equals
  };
  const selectableFilter: SelectableFilter = {
    ...filter,
    selected: false,
    displayName: 'some label'
  };

  const combinedFilter: CombinedFilter = {
    combinator: FilterCombinator.OR,
    filters: [{
      fieldId: 'c_someField',
      matcher: Matcher.Equals,
      value: 'different value'
    }, {
      combinator: FilterCombinator.AND,
      filters: [{
        fieldId: 'c_anotherField',
        matcher: Matcher.Equals,
        value: 'another value'
      }, {
        fieldId: 'c_uniqueField',
        matcher: Matcher.Equals,
        value: 'unique value'
      }]
    }]
  };
  const selectedCombinedFilter: SelectableCombinedFilter = {
    ...combinedFilter,
    selected: true,
    displayName: 'other display name'
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
      },
      selectedCombinedFilter
    ]
  };

  it('setStatic action is handled properly', () => {
    const staticFilters = [selectableFilter, selectedCombinedFilter];
    const actualState = reducer({}, setStatic(staticFilters));
    const expectedState = {
      static: staticFilters
    };

    expect(actualState).toEqual(expectedState);
  });

  it('setFilterOption action is handled properly with no static state', () => {
    const filter: SelectableFilter = {
      fieldId: 'id2',
      matcher: Matcher.Equals,
      value: 'value2',
      selected: true,
      displayName: 'label2'
    };
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const actualState = reducer({}, setFilterOption(filter));
    const expectedState: FiltersState = {
      static: [filter]
    };
    expect(actualState).toEqual(expectedState);
    expect(consoleWarnSpy).toHaveBeenCalledTimes(0);
    consoleWarnSpy.mockClear();
  });

  it('setFilterOption action is handled properly with existing filters', () => {
    const unselectFilterPayload = {
      fieldId: 'id2',
      matcher: Matcher.Equals,
      value: 'value2',
      selected: false,
      displayName: 'label2'
    };

    const selectFilterPayload = {
      fieldId: 'id3',
      matcher: Matcher.Equals,
      value: 'value3',
      selected: true,
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

  it('setFilterOption action is handled properly with a Filter with a NumberRangeValue', () => {
    const selectedFilter: SelectableFilter = {
      fieldId: 'id1',
      matcher: Matcher.Between,
      value: {
        start: {
          matcher: Matcher.GreaterThan,
          value: 3
        },
        end: {
          matcher: Matcher.LessThan,
          value: 10
        }
      },
      selected: true,
      displayName: 'label1'
    };

    const unselectedFilter = {
      ...selectedFilter,
      selected: false
    };

    const selectedState: FiltersState = {
      static: [ selectedFilter ]
    };

    const unselectedState: FiltersState = {
      static: [ unselectedFilter ]
    };

    const actualUnselectedState = reducer(selectedState, setFilterOption(unselectedFilter));
    expect(actualUnselectedState).toEqual(unselectedState);

    const actualSelectedState = reducer(unselectedState, setFilterOption(selectedFilter));
    expect(actualSelectedState).toEqual(selectedState);
  });

  it('setFilterOption action is handled properly with a CombinedFilter', () => {
    const unselectedCombinedFilter = {
      ...selectedCombinedFilter,
      selected: false
    };

    const selectedState: FiltersState = {
      static: [ selectableFilter, selectedCombinedFilter ]
    };

    const unselectedState: FiltersState = {
      static: [ selectableFilter, unselectedCombinedFilter ]
    };

    const actualUnselectedState = reducer(selectedState, setFilterOption(unselectedCombinedFilter));
    expect(actualUnselectedState).toEqual(unselectedState);

    const actualSelectedState = reducer(unselectedState, setFilterOption(selectedCombinedFilter));
    expect(actualSelectedState).toEqual(selectedState);
  });

  it('setFilterOption action is handled properly with filter not found in state when select', () => {
    const selectFilterPayload = {
      fieldId: 'invalid field',
      matcher: Matcher.Equals,
      value: 'invalid value',
      selected: true,
      displayName: 'invalid label'
    };
    const actualState = reducer(initialState, setFilterOption(selectFilterPayload));
    const selectedExpectedState = _.cloneDeep(initialState);
    selectedExpectedState.static.push(selectFilterPayload);
    expect(actualState).toEqual(selectedExpectedState);
  });

  it('setFilterOption action is handled properly with filter not found in state when unselect', () => {
    const unselectFilterPayload: SelectableFilter = {
      fieldId: 'invalid field',
      matcher: Matcher.Equals,
      value: 'invalid value',
      selected: false,
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

  it('setFacetOption action is handled properly with a Filter with a NumberRangeValue', () => {
    const selectedFacetOption: DisplayableFacetOption = {
      matcher: Matcher.Between,
      value: {
        start: {
          matcher: Matcher.GreaterThan,
          value: 3
        },
        end: {
          matcher: Matcher.LessThan,
          value: 10
        }
      },
      selected: true,
      displayName: 'Facet Option Displayname',
      count: 3
    };

    const unselectedFacetOption = {
      ...selectedFacetOption,
      selected: false
    };

    const selectFacetPayload = {
      fieldId: 'someField',
      facetOption: selectedFacetOption,
      shouldSelect: true
    };

    const unselectFacetPayload = {
      fieldId: 'someField',
      facetOption: unselectedFacetOption,
      shouldSelect: false
    };

    const selectedState: FiltersState = {
      facets: [
        {
          fieldId: 'someField',
          options: [ selectedFacetOption ],
          displayName: 'Facet Displayname'
        }
      ]
    };

    const unselectedState: FiltersState = {
      facets: [
        {
          fieldId: 'someField',
          options: [ unselectedFacetOption ],
          displayName: 'Facet Displayname'
        }
      ]
    };

    const actualUnselectedState = reducer(selectedState, setFacetOption(unselectFacetPayload));
    expect(actualUnselectedState).toEqual(unselectedState);

    const actualSelectedState = reducer(unselectedState, setFacetOption(selectFacetPayload));
    expect(actualSelectedState).toEqual(selectedState);
  });
});