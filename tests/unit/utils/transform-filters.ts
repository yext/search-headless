import { CombinedFilter, Filter, FilterCombinator, Matcher } from '@yext/search-core';
import { SelectableCombinedFilter, SelectableFilter } from '../../../src/models/utils/selectableFilter';
import { transformFiltersToCoreFormat } from '../../../src/utils/transform-filters';

describe('see that transformFiltersToCoreFormat works properly', () => {
  const selectableCombinedFilters: SelectableCombinedFilter[] = [
    {
      combinator: FilterCombinator.OR,
      filters: [{
        fieldId: 'c_someField',
        matcher: Matcher.Equals,
        value: 'different value'
      }, {
        fieldId: 'c_anotherField',
        matcher: Matcher.Equals,
        value: 'one more value'
      }],
      displayName: 'some combined label',
      selected: true
    }
  ];

  it('properly handles an undefined or no filter', () => {
    let transformedFilter = transformFiltersToCoreFormat(undefined);
    expect(transformedFilter).toEqual(null);

    transformedFilter = transformFiltersToCoreFormat([]);
    expect(transformedFilter).toEqual(null);
  });

  it('properly handles an unselected Filter', () => {
    const selectableFilters: SelectableFilter[] = [
      {
        fieldId: 'c_someField',
        matcher: Matcher.Equals,
        value: 'some value',
        displayName: 'some label',
        selected: false
      }
    ];
    const transformedFilter = transformFiltersToCoreFormat(selectableFilters);
    expect(transformedFilter).toEqual(null);
  });

  it('properly handles a selected Filter', () => {
    const selectableFilters: SelectableFilter[] = [
      {
        fieldId: 'c_someField',
        matcher: Matcher.Equals,
        value: 'some value',
        displayName: 'some label',
        selected: true
      }
    ];
    const expectedFilters = {
      fieldId: 'c_someField',
      matcher: Matcher.Equals,
      value: 'some value'
    };
    const transformedFilter = transformFiltersToCoreFormat(selectableFilters);
    expect(transformedFilter).toEqual(expectedFilters);
  });

  it('properly handles a selected combined Filter', () => {
    const expectedFilters = {
      combinator: FilterCombinator.OR,
      filters: [{
        fieldId: 'c_someField',
        matcher: Matcher.Equals,
        value: 'different value'
      }, {
        fieldId: 'c_anotherField',
        matcher: Matcher.Equals,
        value: 'one more value'
      }]
    };
    const transformedFilter = transformFiltersToCoreFormat(selectableCombinedFilters);
    expect(transformedFilter).toEqual(expectedFilters);
  });

  it('properly handles selected multiple filters of same group', () => {
    const filter = {
      fieldId: 'c_someField',
      matcher: Matcher.Equals,
      value: 'some value'
    };
    const selectableFilter = {
      ...filter,
      displayName: 'some label',
      selected: true
    };
    const filters: SelectableFilter[] = [selectableFilter, selectableFilter, selectableFilter];
    const expectedFilters = {
      combinator: FilterCombinator.OR,
      filters: [filter, filter, filter]
    };
    const transformedFilter = transformFiltersToCoreFormat(filters);
    expect(transformedFilter).toEqual(expectedFilters);
  });

  it('properly handles selected combined filter and multiple selected filters of same group', () => {
    const filter = {
      fieldId: 'c_someField',
      matcher: Matcher.Equals,
      value: 'some value'
    };
    const selectableFilter = {
      ...filter,
      displayName: 'some label',
      selected: true
    };
    const filters = [selectableFilter, selectableFilter, selectableFilter, selectableCombinedFilters[0]];
    const expectedFilters = {
      combinator: FilterCombinator.AND,
      filters: [{
        combinator: FilterCombinator.OR,
        filters: [filter, filter, filter]
      }, {
        combinator: FilterCombinator.OR,
        filters: [{
          fieldId: 'c_someField',
          matcher: Matcher.Equals,
          value: 'different value'
        }, {
          fieldId: 'c_anotherField',
          matcher: Matcher.Equals,
          value: 'one more value'
        }]
      }]
    };
    const transformedFilter = transformFiltersToCoreFormat(filters);
    expect(transformedFilter).toEqual(expectedFilters);
  });

  it('properly handles selected combined filters and filters of different groups', () => {
    const filters: (Filter | CombinedFilter)[] = [
      {
        fieldId: 'c_someField',
        matcher: Matcher.Equals,
        value: 'some value'
      },
      {
        fieldId: 'c_aDifferentField',
        matcher: Matcher.Equals,
        value: 'a different value'
      },
      {
        fieldId: 'c_someField',
        matcher: Matcher.Equals,
        value: 'unique value'
      },
      {
        fieldId: 'c_aDifferentField',
        matcher: Matcher.Equals,
        value: 'another value'
      },
      {
        combinator: selectableCombinedFilters[0].combinator,
        filters: selectableCombinedFilters[0].filters
      },
      {
        combinator: FilterCombinator.OR,
        filters: [{
          fieldId: 'c_someField',
          matcher: Matcher.Equals,
          value: 'a value'
        }, {
          fieldId: 'c_anotherField',
          matcher: Matcher.Equals,
          value: 'separate value'
        }]
      }
    ];

    const selectableFilters: (SelectableFilter | SelectableCombinedFilter)[] = [
      {
        ...filters[0],
        displayName: 'some label',
        selected: true
      },
      {
        ...filters[1],
        displayName: 'different label',
        selected: true
      },
      {
        ...filters[2],
        displayName: 'unique label',
        selected: true
      },
      {
        ...filters[3],
        displayName: 'another label',
        selected: true
      },
      {
        ...filters[4],
        displayName: 'some combined label',
        selected: true
      },
      {
        ...filters[5],
        displayName: 'another combined label',
        selected: true
      }
    ];

    const expectedFilters: CombinedFilter = {
      combinator: FilterCombinator.AND,
      filters: [
        {
          combinator: FilterCombinator.OR,
          filters: [filters[0], filters[2]]
        },
        {
          combinator: FilterCombinator.OR,
          filters: [filters[1], filters[3]]
        },
        filters[4],
        filters[5]
      ]
    };
    const transformedFilter = transformFiltersToCoreFormat(selectableFilters);
    expect(transformedFilter).toEqual(expectedFilters);
  });

  it('properly handles a mix of unselected and selected combined filters and filters of different groups', () => {
    const filters: (Filter | CombinedFilter)[] = [
      {
        fieldId: 'c_someField',
        matcher: Matcher.Equals,
        value: 'some value'
      },
      {
        fieldId: 'c_aDifferentField',
        matcher: Matcher.Equals,
        value: 'a different value'
      },
      {
        fieldId: 'c_someField',
        matcher: Matcher.Equals,
        value: 'unique value'
      },
      {
        fieldId: 'c_aDifferentField',
        matcher: Matcher.Equals,
        value: 'another value'
      },
      {
        combinator: selectableCombinedFilters[0].combinator,
        filters: selectableCombinedFilters[0].filters
      },
      {
        combinator: FilterCombinator.OR,
        filters: [{
          fieldId: 'c_someField',
          matcher: Matcher.Equals,
          value: 'a value'
        }, {
          fieldId: 'c_anotherField',
          matcher: Matcher.Equals,
          value: 'separate value'
        }]
      }
    ];

    const selectableFilters: (SelectableFilter | SelectableCombinedFilter)[] = [
      {
        ...filters[0],
        displayName: 'some label',
        selected: false
      },
      {
        ...filters[1],
        displayName: 'different label',
        selected: false
      },
      {
        ...filters[2],
        displayName: 'unique label',
        selected: true
      },
      {
        ...filters[3],
        displayName: 'another label',
        selected: true
      },
      {
        ...filters[4],
        displayName: 'some combined label',
        selected: true
      },
      {
        ...filters[5],
        displayName: 'another combined label',
        selected: false
      }
    ];

    const expectedFilters: CombinedFilter = {
      combinator: FilterCombinator.AND,
      filters: [filters[2], filters[3], filters[4]]
    };
    const transformedFilter = transformFiltersToCoreFormat(selectableFilters);
    expect(transformedFilter).toEqual(expectedFilters);
  });
});