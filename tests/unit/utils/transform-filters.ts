import { CombinedFilter, Filter, FilterCombinator, Matcher } from '@yext/answers-core';
import { SelectableFilter } from '../../../src/models/utils/selectablefilter';
import { transformFiltersToCoreFormat } from '../../../src/utils/transform-filters';

describe('see that transformFiltersToCoreFormat works properly', () => {
  it('properly handle an undefined filter', () => {
    let transformedFilter = transformFiltersToCoreFormat(undefined);
    expect(transformedFilter).toEqual(null);

    transformedFilter = transformFiltersToCoreFormat({someId: null, anotherId: null});
    expect(transformedFilter).toEqual(null);

    transformedFilter = transformFiltersToCoreFormat({someId: []});
    expect(transformedFilter).toEqual(null);
  });

  it('properly handle a selected Filter', () => {
    const filters: Record<string, SelectableFilter[]> = {
      someId: [
        {
          filter: {
            fieldId: 'c_someField',
            matcher: Matcher.Equals,
            value: 'some value'
          },
          selected: true
        }
      ]
    };
    const expectedFilters = filters.someId[0].filter;
    const transformedFilter = transformFiltersToCoreFormat(filters);
    expect(transformedFilter).toEqual(expectedFilters);
  });

  it('properly handle selected multiple filters of same group', () => {
    const filter = {
      fieldId: 'c_someField',
      matcher: Matcher.Equals,
      value: 'some value'
    };
    const filters: Record<string, SelectableFilter[]> = {
      someId: [
        {
          filter,
          selected: true
        },
        {
          filter,
          selected: true
        },
        {
          filter,
          selected: true
        }
      ]
    };
    const expectedFilters = {
      combinator: FilterCombinator.OR,
      filters: [filter, filter, filter]
    };
    const transformedFilter = transformFiltersToCoreFormat(filters);
    expect(transformedFilter).toEqual(expectedFilters);
  });

  it('properly handle selected filters of different groups', () => {
    const selectableFilters: SelectableFilter[] = [
      {
        filter: {
          fieldId: 'c_someField',
          matcher: Matcher.Equals,
          value: 'some value'
        },
        selected: true
      },
      {
        filter: {
          fieldId: 'c_aDifferentField',
          matcher: Matcher.Equals,
          value: 'a different value'
        },
        selected: true
      },
      {
        filter: {
          fieldId: 'c_someField',
          matcher: Matcher.Equals,
          value: 'unique value'
        },
        selected: true
      },
      {
        filter: {
          fieldId: 'c_aDifferentField',
          matcher: Matcher.Equals,
          value: 'another value'
        },
        selected: true
      }
    ];
    const filters = {
      someId: selectableFilters
    };
    const expectedFilters: Filter | CombinedFilter = {
      combinator: FilterCombinator.AND,
      filters: [
        {
          combinator: FilterCombinator.OR,
          filters: [filters.someId[0].filter, filters.someId[2].filter]
        },
        {
          combinator: FilterCombinator.OR,
          filters: [filters.someId[1].filter, filters.someId[3].filter]
        }
      ]
    };
    const transformedFilter = transformFiltersToCoreFormat(filters);
    expect(transformedFilter).toEqual(expectedFilters);
  });

  it('properly handle a mix of unselected and selected filters of different groups', () => {
    const selectableFilters: SelectableFilter[] = [
      {
        filter: {
          fieldId: 'c_someField',
          matcher: Matcher.Equals,
          value: 'some value'
        },
        selected: false
      },
      {
        filter: {
          fieldId: 'c_aDifferentField',
          matcher: Matcher.Equals,
          value: 'a different value'
        },
        selected: false
      },
      {
        filter: {
          fieldId: 'c_someField',
          matcher: Matcher.Equals,
          value: 'unique value'
        },
        selected: true
      },
      {
        filter: {
          fieldId: 'c_aDifferentField',
          matcher: Matcher.Equals,
          value: 'another value'
        },
        selected: true
      }
    ];
    const filters = {
      someId: selectableFilters
    };
    const expectedFilters: Filter | CombinedFilter = {
      combinator: FilterCombinator.AND,
      filters: [filters.someId[2].filter, filters.someId[3].filter]
    };
    const transformedFilter = transformFiltersToCoreFormat(filters);
    expect(transformedFilter).toEqual(expectedFilters);
  });

  it('properly handle selected filters of different groups with different filterCollectionIds', () => {
    const someIdSelectableFilters: SelectableFilter[] = [
      {
        filter: {
          fieldId: 'c_someField',
          matcher: Matcher.Equals,
          value: 'some value'
        },
        selected: true
      },
      {
        filter: {
          fieldId: 'c_someField',
          matcher: Matcher.Equals,
          value: 'unique value'
        },
        selected: true
      },
      {
        filter: {
          fieldId: 'c_differentField',
          matcher: Matcher.Equals,
          value: 'very unique value'
        },
        selected: true
      }
    ];

    const anotherIdSelectableFilters: SelectableFilter[] = [
      {
        filter: {
          fieldId: 'c_anotherField',
          matcher: Matcher.Equals,
          value: 'another value'
        },
        selected: true
      },
      {
        filter: {
          fieldId: 'c_anotherField',
          matcher: Matcher.Equals,
          value: 'unique value'
        },
        selected: true
      }
    ];

    const filters = {
      someId: someIdSelectableFilters,
      anotherId: anotherIdSelectableFilters
    };
    const expectedFilters: Filter | CombinedFilter = {
      combinator: FilterCombinator.AND,
      filters: [
        {
          combinator: FilterCombinator.AND,
          filters: [
            {
              combinator: FilterCombinator.OR,
              filters: [filters.someId[0].filter, filters.someId[1].filter]
            },
            filters.someId[2].filter
          ]
        },
        {
          combinator: FilterCombinator.OR,
          filters: [filters.anotherId[0].filter, filters.anotherId[1].filter]
        }
      ]
    };
    const transformedFilter = transformFiltersToCoreFormat(filters);
    expect(transformedFilter).toEqual(expectedFilters);
  });
});