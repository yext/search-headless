import { DisplayableFacetOption, FilterCombinator, Matcher, StaticFilter } from '@yext/search-core';
import createFiltersSlice from '../../../src/slices/filters';
import _ from 'lodash';
import { FiltersState, SelectableStaticFilter } from '../../../src';

const { actions, reducer } = createFiltersSlice('');
const { setStatic, setFacets, resetFacets, setFilterOption, setFacetOption } = actions;

describe('filter slice reducer works as expected', () => {

  const filter: StaticFilter = {
    kind: 'fieldValue',
    fieldId: 'someField',
    value: 'some value',
    matcher: Matcher.Equals
  };
  const selectableFilter: SelectableStaticFilter = {
    filter,
    selected: false,
    displayName: 'some label'
  };

  const disjunctionFilter: StaticFilter = {
    kind: 'disjunction',
    combinator: FilterCombinator.OR,
    filters: [{
      kind: 'fieldValue',
      fieldId: 'c_someField',
      matcher: Matcher.Equals,
      value: 'a value'
    }, {
      kind: 'fieldValue',
      fieldId: 'c_anotherField',
      matcher: Matcher.Equals,
      value: 'separate value'
    }]
  };
  const selectedDisjunctionFilter: SelectableStaticFilter = {
    filter: disjunctionFilter,
    selected: true,
    displayName: 'different label'
  };

  const conjunctionFilter: StaticFilter = {
    kind: 'conjunction',
    combinator: FilterCombinator.AND,
    filters: [{
      kind: 'fieldValue',
      fieldId: 'c_someField',
      matcher: Matcher.Equals,
      value: 'different value'
    }, {
      kind: 'conjunction',
      combinator: FilterCombinator.AND,
      filters: [{
        kind: 'fieldValue',
        fieldId: 'c_anotherField',
        matcher: Matcher.Equals,
        value: 'another value'
      }, {
        kind: 'fieldValue',
        fieldId: 'c_uniqueField',
        matcher: Matcher.Equals,
        value: 'unique value'
      }]
    }]
  };
  const selectedConjunctionFilter: SelectableStaticFilter = {
    filter: conjunctionFilter,
    selected: true,
    displayName: 'other display name'
  };

  const initialState: FiltersState = {
    static: [
      {
        filter: {
          kind: 'fieldValue',
          fieldId: 'id1',
          matcher: Matcher.Equals,
          value: 'value1'
        },
        selected: true,
        displayName: 'label1'
      },
      {
        filter: {
          kind: 'fieldValue',
          fieldId: 'id2',
          matcher: Matcher.Equals,
          value: 'value2'
        },
        selected: true,
        displayName: 'label2'
      },
      {
        filter: {
          kind: 'fieldValue',
          fieldId: 'id3',
          matcher: Matcher.Equals,
          value: 'value3'
        },
        selected: false,
        displayName: 'label3'
      },
      selectedDisjunctionFilter
    ]
  };

  it('setStatic action is handled properly', () => {
    const staticFilters = [selectableFilter, selectedDisjunctionFilter, selectedConjunctionFilter];
    const actualState = reducer({}, setStatic(staticFilters));
    const expectedState = {
      static: staticFilters
    };

    expect(actualState).toEqual(expectedState);
  });

  it('setFilterOption action is handled properly with no static state', () => {
    const filter: SelectableStaticFilter = {
      filter: {
        kind: 'fieldValue',
        fieldId: 'id2',
        matcher: Matcher.Equals,
        value: 'value2'
      },
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
    const unselectFilterPayload: SelectableStaticFilter = {
      filter: {
        kind: 'fieldValue',
        fieldId: 'id2',
        matcher: Matcher.Equals,
        value: 'value2'
      },
      selected: false,
      displayName: 'label2'
    };

    const selectFilterPayload: SelectableStaticFilter = {
      filter: {
        kind: 'fieldValue',
        fieldId: 'id3',
        matcher: Matcher.Equals,
        value: 'value3'
      },
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
    const selectedFilter: SelectableStaticFilter = {
      filter: {
        kind: 'fieldValue',
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

  it('setFilterOption action is handled properly with a DisjunctionStaticFilter', () => {
    const unselectedDisjunctionFilter = {
      ...selectedDisjunctionFilter,
      selected: false
    };

    const unselectedState: FiltersState = {
      static: [
        initialState.static[0],
        initialState.static[1],
        initialState.static[2],
        unselectedDisjunctionFilter
      ]
    };

    const actualUnselectedState = reducer(initialState, setFilterOption(unselectedDisjunctionFilter));
    expect(actualUnselectedState).toEqual(unselectedState);

    const actualSelectedState = reducer(unselectedState, setFilterOption(selectedDisjunctionFilter));
    expect(actualSelectedState).toEqual(initialState);
  });

  it('setFilterOption action is handled properly with a ConjunctionStaticFilter', () => {
    const unselectedConjunctionFilter = {
      ...selectedConjunctionFilter,
      selected: false
    };

    const selectedState: FiltersState = {
      static: [ selectedConjunctionFilter ]
    };

    const unselectedState: FiltersState = {
      static: [ unselectedConjunctionFilter ]
    };

    const actualUnselectedState = reducer(selectedState, setFilterOption(unselectedConjunctionFilter));
    expect(actualUnselectedState).toEqual(unselectedState);

    const actualSelectedState = reducer(unselectedState, setFilterOption(selectedConjunctionFilter));
    expect(actualSelectedState).toEqual(selectedState);
  });

  it('setFilterOption action is handled properly with filter not found in state when select', () => {
    const selectFilterPayload: SelectableStaticFilter = {
      filter: {
        kind: 'fieldValue',
        fieldId: 'invalid field',
        matcher: Matcher.Equals,
        value: 'invalid value'
      },
      selected: true,
      displayName: 'invalid label'
    };
    const actualState = reducer(initialState, setFilterOption(selectFilterPayload));
    const selectedExpectedState = _.cloneDeep(initialState);
    selectedExpectedState.static.push(selectFilterPayload);
    expect(actualState).toEqual(selectedExpectedState);
  });

  it('setFilterOption action is handled properly with filter not found in state when unselect', () => {
    const unselectFilterPayload: SelectableStaticFilter = {
      filter: {
        kind: 'fieldValue',
        fieldId: 'invalid field',
        matcher: Matcher.Equals,
        value: 'invalid value'
      },
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