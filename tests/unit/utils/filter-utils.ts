import { FilterCombinator, StaticFilter } from '@yext/search-core';
import { createEqualsStaticFilter } from '../../../src';
import { areFieldValueFiltersEqual, areStaticFiltersEqual } from '../../../src/utils/filter-utils';

describe('filter utils work properly', () => {
  const filterA = createEqualsStaticFilter('someField', 'same value');
  const filterB = createEqualsStaticFilter('someField', 'same value');
  const filterC = createEqualsStaticFilter('DifferentField', 'different value');
  const filterD = createEqualsStaticFilter('differentField', 'another value');

  it('areFieldValueFiltersEqual returns true for the same filter', () => {
    expect(areFieldValueFiltersEqual(filterA, filterB)).toBeTruthy();
  });

  it('areFieldValueFiltersEqual returns false for different filters', () => {
    expect(areFieldValueFiltersEqual(filterA, filterC)).toBeFalsy();
  });

  it('areStaticFiltersEqual returns true for same filters combined in different orders', () => {
    const combinedFilterA: StaticFilter = {
      kind: 'disjunction',
      combinator: FilterCombinator.OR,
      filters: [filterA, filterB, filterC, filterD]
    };
    const combinedFilterB: StaticFilter = {
      ...combinedFilterA,
      filters: [filterD, filterC, filterB, filterA]
    };
    expect(areStaticFiltersEqual(combinedFilterA, combinedFilterB)).toBeTruthy();
  });

  it('areStaticFiltersEqual returns false for different combined filters', () => {
    const combinedFilterA: StaticFilter = {
      kind: 'disjunction',
      combinator: FilterCombinator.OR,
      filters: [filterA, filterB, filterC, filterC]
    };
    const combinedFilterB: StaticFilter = {
      ...combinedFilterA,
      filters: [filterA, filterB, filterC, filterD]
    };
    expect(areStaticFiltersEqual(combinedFilterA, combinedFilterB)).toBeFalsy();
  });
});