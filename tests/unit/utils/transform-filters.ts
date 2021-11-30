import { CombinedFilter, Filter, FilterCombinator, Matcher } from '@yext/answers-core';
import { SelectableFilter } from '../../../src/models/utils/selectablefilter';
import { transformFiltersToCoreFormat } from '../../../src/utils/transform-filters';

describe('see that transformFiltersToCoreFormat works properly', () => {
  it('properly handle an undefined or no filter', () => {
    let transformedFilter = transformFiltersToCoreFormat(undefined);
    expect(transformedFilter).toEqual(null);

    transformedFilter = transformFiltersToCoreFormat([]);
    expect(transformedFilter).toEqual(null);
  });

  it('properly handle an unselected Filter', () => {
    const selectableFilters: SelectableFilter[] = [
      {
        fieldId: 'c_someField',
        matcher: Matcher.Equals,
        value: 'some value',
        selected: false
      }
    ];
    const transformedFilter = transformFiltersToCoreFormat(selectableFilters);
    expect(transformedFilter).toEqual(null);
  });

  it('properly handle a selected Filter', () => {
    const selectableFilters: SelectableFilter[] = [
      {
        fieldId: 'c_someField',
        matcher: Matcher.Equals,
        value: 'some value',
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

  it('properly handle selected multiple filters of same group', () => {
    const filter = {
      fieldId: 'c_someField',
      matcher: Matcher.Equals,
      value: 'some value'
    };
    const selectableFilter = {
      ...filter,
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

  it('properly handle selected filters of different groups', () => {
    const filters: Filter[] = [
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
      }
    ];

    const selectableFilters: SelectableFilter[] = [
      {
        ...filters[0],
        selected: true
      },
      {
        ...filters[1],
        selected: true
      },
      {
        ...filters[2],
        selected: true
      },
      {
        ...filters[3],
        selected: true
      }
    ];

    const expectedFilters: Filter | CombinedFilter = {
      combinator: FilterCombinator.AND,
      filters: [
        {
          combinator: FilterCombinator.OR,
          filters: [filters[0], filters[2]]
        },
        {
          combinator: FilterCombinator.OR,
          filters: [filters[1], filters[3]]
        }
      ]
    };
    const transformedFilter = transformFiltersToCoreFormat(selectableFilters);
    expect(transformedFilter).toEqual(expectedFilters);
  });

  it('properly handle a mix of unselected and selected filters of different groups', () => {
    const filters: Filter[] = [
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
      }
    ];

    const selectableFilters: SelectableFilter[] = [
      {
        ...filters[0],
        selected: false
      },
      {
        ...filters[1],
        selected: false
      },
      {
        ...filters[2],
        selected: true
      },
      {
        ...filters[3],
        selected: true
      }
    ];
    const expectedFilters: Filter | CombinedFilter = {
      combinator: FilterCombinator.AND,
      filters: [filters[2], filters[3]]
    };
    const transformedFilter = transformFiltersToCoreFormat(selectableFilters);
    expect(transformedFilter).toEqual(expectedFilters);
  });
});