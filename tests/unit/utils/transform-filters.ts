import { CombinedFilter, Filter, FilterCombinator, Matcher } from '@yext/answers-core';
import { CombinedSelectableFilter, SelectableFilter } from '../../../src/models/utils/selectablefilter';
import {
  transformFiltersToHeadlessFormat,
  transformFiltersToCoreFormat
} from '../../../src/utils/transform-filters';

describe('see that transformFiltersToHeadlessFormat works properly', () => {
  it('properly handle an empty list of filter', () => {
    let transformedFilter = transformFiltersToHeadlessFormat(null);
    expect(transformedFilter).toEqual(null);
    transformedFilter = transformFiltersToHeadlessFormat([]);
    expect(transformedFilter).toEqual(null);
  });

  it('properly handle one filter in given list', () => {
    const filters: Filter[] = [{
      fieldId: 'c_someField',
      matcher: Matcher.Equals,
      value: 'some value'
    }];

    const expectedFilters: SelectableFilter = {
      filter: filters[0],
      selectable: false
    };
    const transformedFilter = transformFiltersToHeadlessFormat(filters);
    expect(transformedFilter).toEqual(expectedFilters);
  });

  it('properly handle multiple filters of same group in given list', () => {
    const filters: Filter[] = [
      {
        fieldId: 'c_someField',
        matcher: Matcher.Equals,
        value: 'some value'
      },
      {
        fieldId: 'c_someField',
        matcher: Matcher.Equals,
        value: 'a different value'
      }
    ];

    const expectedFilters: CombinedSelectableFilter = {
      combinator: FilterCombinator.OR,
      filters: [
        {
          filter: filters[0],
          selectable: false
        },
        {
          filter: filters[1],
          selectable: false
        }
      ]
    };
    const transformedFilter = transformFiltersToHeadlessFormat(filters);
    expect(transformedFilter).toEqual(expectedFilters);
  });

  it('properly handle multiple filters of different groups in given list', () => {
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

    const firstGroupedFilters: CombinedSelectableFilter = {
      combinator: FilterCombinator.OR,
      filters: [
        {
          filter: filters[0],
          selectable: false
        },
        {
          filter: filters[2],
          selectable: false
        }
      ]
    };

    const secondGroupedFilters: CombinedSelectableFilter = {
      combinator: FilterCombinator.OR,
      filters: [
        {
          filter: filters[1],
          selectable: false
        },
        {
          filter: filters[3],
          selectable: false
        }
      ]
    };

    const expectedFilters: CombinedSelectableFilter = {
      combinator: FilterCombinator.AND,
      filters: [firstGroupedFilters, secondGroupedFilters]
    };
    const transformedFilter = transformFiltersToHeadlessFormat(filters);
    expect(transformedFilter).toEqual(expectedFilters);
  });
});


describe('see that transformFiltersToCoreFormat works properly', () => {
  it('properly handle an undefined filter', () => {
    const transformedFilter = transformFiltersToCoreFormat(undefined);
    expect(transformedFilter).toEqual(null);
  });

  it('properly handle a Filter', () => {
    const filters: Record<string, SelectableFilter> = {
      someId: {
        filter: {
          fieldId: 'c_someField',
          matcher: Matcher.Equals,
          value: 'some value'
        },
        selectable: true
      }
    };
    const expectedFilters = filters.someId.filter;
    const transformedFilter = transformFiltersToCoreFormat(filters);
    expect(transformedFilter).toEqual(expectedFilters);
  });

  it('properly handle a CombinedFilter', () => {
    const filter = {
      fieldId: 'c_someField',
      matcher: Matcher.Equals,
      value: 'some value'
    };
    const filters: Record<string, CombinedSelectableFilter> = {
      someId: {
        combinator: FilterCombinator.OR,
        filters: [
          {
            filter,
            selectable: true
          },
          {
            filter,
            selectable: false
          }
        ]
      }
    };
    const expectedFilters = {
      combinator: FilterCombinator.OR,
      filters: [filter, filter]
    };
    const transformedFilter = transformFiltersToCoreFormat(filters);
    expect(transformedFilter).toEqual(expectedFilters);
  });

  it('properly handle a list of Filter and CombinedFilter', () => {
    const filter = {
      fieldId: 'c_someField',
      matcher: Matcher.Equals,
      value: 'some value'
    };
    const filters: Record<string, SelectableFilter | CombinedSelectableFilter> = {
      someId: {
        combinator: FilterCombinator.AND,
        filters: [
          {
            filter,
            selectable: true
          },
          {
            filter,
            selectable: false
          }
        ]
      },
      anotherId: {
        filter,
        selectable: false
      },
      randomId: {
        combinator: FilterCombinator.OR,
        filters: [
          {
            filter,
            selectable: true
          },
          {
            filter,
            selectable: false
          }
        ]
      }
    };
    const expectedFilters: Filter | CombinedFilter = {
      combinator: FilterCombinator.AND,
      filters: [
        {
          combinator: FilterCombinator.AND,
          filters: [filter, filter]
        },
        filter,
        {
          combinator: FilterCombinator.OR,
          filters: [filter, filter]
        }
      ]
    };
    const transformedFilter = transformFiltersToCoreFormat(filters);
    expect(transformedFilter).toEqual(expectedFilters);
  });

});