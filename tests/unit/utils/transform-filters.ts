import { FieldValueStaticFilter, FilterCombinator, Matcher, StaticFilter } from '@yext/search-core';
import { SelectableStaticFilter } from '../../../src/models/utils/selectableStaticFilter';
import { transformFiltersToCoreFormat } from '../../../src/utils/transform-filters';

describe('see that transformFiltersToCoreFormat works properly', () => {
  it('properly handle an undefined or no filter', () => {
    let transformedFilter = transformFiltersToCoreFormat(undefined);
    expect(transformedFilter).toEqual(null);

    transformedFilter = transformFiltersToCoreFormat([]);
    expect(transformedFilter).toEqual(null);
  });

  it('properly handle an unselected static filter', () => {
    const selectableFilters: SelectableStaticFilter[] = [
      {
        filter: {
          kind: 'fieldValue',
          fieldId: 'c_someField',
          matcher: Matcher.Equals,
          value: 'some value'
        },
        displayName: 'some label',
        selected: false
      }
    ];
    const transformedFilter = transformFiltersToCoreFormat(selectableFilters);
    expect(transformedFilter).toEqual(null);
  });

  it('properly handle a selected field value static filter', () => {
    const selectableFilters: SelectableStaticFilter[] = [
      {
        filter: {
          kind: 'fieldValue',
          fieldId: 'c_someField',
          matcher: Matcher.Equals,
          value: 'some value'
        },
        displayName: 'some label',
        selected: true
      }
    ];
    const expectedFilters = {
      kind: 'fieldValue',
      fieldId: 'c_someField',
      matcher: Matcher.Equals,
      value: 'some value'
    };
    const transformedFilter = transformFiltersToCoreFormat(selectableFilters);
    expect(transformedFilter).toEqual(expectedFilters);
  });

  it('properly handle a selected conjunction static filter', () => {
    const selectableFilters: SelectableStaticFilter[] = [
      {
        filter: {
          kind: 'conjunction',
          combinator: FilterCombinator.AND,
          filters: [{
            kind: 'fieldValue',
            fieldId: 'c_someField',
            matcher: Matcher.Equals,
            value: 'some value'
          }, {
            kind: 'fieldValue',
            fieldId: 'c_someField',
            matcher: Matcher.Equals,
            value: 'different value'
          }]
        },
        displayName: 'some label',
        selected: true
      }
    ];
    const expectedFilters = {
      kind: 'conjunction',
      combinator: FilterCombinator.AND,
      filters: [{
        kind: 'fieldValue',
        fieldId: 'c_someField',
        matcher: Matcher.Equals,
        value: 'some value'
      }, {
        kind: 'fieldValue',
        fieldId: 'c_someField',
        matcher: Matcher.Equals,
        value: 'different value'
      }]
    };
    const transformedFilter = transformFiltersToCoreFormat(selectableFilters);
    expect(transformedFilter).toEqual(expectedFilters);
  });

  it('properly handle multiple selected filters of same group', () => {
    const filter: StaticFilter = {
      kind: 'fieldValue',
      fieldId: 'c_someField',
      matcher: Matcher.Equals,
      value: 'some value'
    };
    const selectableFilter: SelectableStaticFilter = {
      filter,
      displayName: 'some label',
      selected: true
    };
    const filters: SelectableStaticFilter[] = [selectableFilter, selectableFilter, selectableFilter];
    const expectedFilters = {
      kind: 'disjunction',
      combinator: FilterCombinator.OR,
      filters: [filter, filter, filter]
    };
    const transformedFilter = transformFiltersToCoreFormat(filters);
    expect(transformedFilter).toEqual(expectedFilters);
  });

  it('properly handle multiple selected filters of different kinds', () => {
    const filters: StaticFilter[] = [
      {
        kind: 'fieldValue',
        fieldId: 'c_someField',
        matcher: Matcher.Equals,
        value: 'some value'
      },
      {
        kind: 'disjunction',
        combinator: FilterCombinator.OR,
        filters: [{
          kind: 'fieldValue',
          fieldId: 'c_aDifferentField',
          matcher: Matcher.Equals,
          value: 'a different value'
        },
        {
          kind: 'fieldValue',
          fieldId: 'c_someField',
          matcher: Matcher.Equals,
          value: 'unique value'
        }]
      },
      {
        kind: 'conjunction',
        combinator: FilterCombinator.AND,
        filters: [{
          kind: 'fieldValue',
          fieldId: 'c_anotherField',
          matcher: Matcher.Equals,
          value: 'another value'
        }, {
          kind: 'fieldValue',
          fieldId: 'c_aDifferentField',
          matcher: Matcher.Equals,
          value: 'separate value'
        }]
      },
      {
        kind: 'conjunction',
        combinator: FilterCombinator.AND,
        filters: [{
          kind: 'fieldValue',
          fieldId: 'c_someField',
          matcher: Matcher.Equals,
          value: 'a value'
        },
        {
          kind: 'fieldValue',
          fieldId: 'c_someField',
          matcher: Matcher.Equals,
          value: 'one more value'
        }]
      }
    ];

    const selectableFilters: SelectableStaticFilter[] = [
      {
        filter: filters[0],
        displayName: 'some label',
        selected: true
      },
      {
        filter: filters[1],
        displayName: 'different label',
        selected: true
      },
      {
        filter: filters[2],
        displayName: 'unique label',
        selected: true
      },
      {
        filter: filters[3],
        displayName: 'another label',
        selected: true
      }
    ];

    const expectedFilters: StaticFilter = {
      kind: 'conjunction',
      combinator: FilterCombinator.AND,
      filters
    };
    const transformedFilter = transformFiltersToCoreFormat(selectableFilters);
    expect(transformedFilter).toEqual(expectedFilters);
  });

  it('properly handle selected filters of different groups', () => {
    const filters: FieldValueStaticFilter[] = [
      {
        kind: 'fieldValue',
        fieldId: 'c_someField',
        matcher: Matcher.Equals,
        value: 'some value'
      },
      {
        kind: 'fieldValue',
        fieldId: 'c_aDifferentField',
        matcher: Matcher.Equals,
        value: 'a different value'
      },
      {
        kind: 'fieldValue',
        fieldId: 'c_someField',
        matcher: Matcher.Equals,
        value: 'unique value'
      },
      {
        kind: 'fieldValue',
        fieldId: 'c_aDifferentField',
        matcher: Matcher.Equals,
        value: 'another value'
      }
    ];

    const selectableFilters: SelectableStaticFilter[] = [
      {
        filter: filters[0],
        displayName: 'some label',
        selected: true
      },
      {
        filter: filters[1],
        displayName: 'different label',
        selected: true
      },
      {
        filter: filters[2],
        displayName: 'unique label',
        selected: true
      },
      {
        filter: filters[3],
        displayName: 'another label',
        selected: true
      }
    ];

    const expectedFilters: StaticFilter = {
      kind: 'conjunction',
      combinator: FilterCombinator.AND,
      filters: [
        {
          kind: 'disjunction',
          combinator: FilterCombinator.OR,
          filters: [filters[0], filters[2]]
        },
        {
          kind: 'disjunction',
          combinator: FilterCombinator.OR,
          filters: [filters[1], filters[3]]
        }
      ]
    };
    const transformedFilter = transformFiltersToCoreFormat(selectableFilters);
    expect(transformedFilter).toEqual(expectedFilters);
  });

  it('properly handle a mix of unselected and selected filters of different groups and kinds', () => {
    const filters: StaticFilter[] = [
      {
        kind: 'fieldValue',
        fieldId: 'c_someField',
        matcher: Matcher.Equals,
        value: 'some value'
      },
      {
        kind: 'fieldValue',
        fieldId: 'c_aDifferentField',
        matcher: Matcher.Equals,
        value: 'a different value'
      },
      {
        kind: 'fieldValue',
        fieldId: 'c_someField',
        matcher: Matcher.Equals,
        value: 'unique value'
      },
      {
        kind: 'fieldValue',
        fieldId: 'c_aDifferentField',
        matcher: Matcher.Equals,
        value: 'another value'
      },
      {
        kind: 'disjunction',
        combinator: FilterCombinator.OR,
        filters: [{
          kind: 'fieldValue',
          fieldId: 'c_aDifferentField',
          matcher: Matcher.Equals,
          value: 'different value'
        },
        {
          kind: 'fieldValue',
          fieldId: 'c_someField',
          matcher: Matcher.Equals,
          value: 'a unique value'
        }]
      },
      {
        kind: 'conjunction',
        combinator: FilterCombinator.AND,
        filters: [{
          kind: 'fieldValue',
          fieldId: 'c_anotherField',
          matcher: Matcher.Equals,
          value: 'yet another value'
        }, {
          kind: 'fieldValue',
          fieldId: 'c_aDifferentField',
          matcher: Matcher.Equals,
          value: 'separate value'
        }]
      },
      {
        kind: 'conjunction',
        combinator: FilterCombinator.AND,
        filters: [{
          kind: 'fieldValue',
          fieldId: 'c_someField',
          matcher: Matcher.Equals,
          value: 'a value'
        },
        {
          kind: 'fieldValue',
          fieldId: 'c_someField',
          matcher: Matcher.Equals,
          value: 'one more value'
        }]
      }
    ];

    const selectableFilters: SelectableStaticFilter[] = [
      {
        filter: filters[0],
        displayName: 'some label',
        selected: false
      },
      {
        filter: filters[1],
        displayName: 'different label',
        selected: false
      },
      {
        filter: filters[2],
        displayName: 'unique label',
        selected: true
      },
      {
        filter: filters[3],
        displayName: 'another label',
        selected: true
      },
      {
        filter: filters[4],
        displayName: 'a label',
        selected: false
      },
      {
        filter: filters[5],
        displayName: 'one more label',
        selected: true
      },
      {
        filter: filters[6],
        displayName: 'separate label',
        selected: false
      }
    ];

    const expectedFilters: StaticFilter = {
      kind: 'conjunction',
      combinator: FilterCombinator.AND,
      filters: [filters[2], filters[3], filters[5]]
    };
    const transformedFilter = transformFiltersToCoreFormat(selectableFilters);
    expect(transformedFilter).toEqual(expectedFilters);
  });
});