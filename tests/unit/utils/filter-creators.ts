import { ConjunctionStaticFilter, FilterCombinator, Matcher, StaticFilter } from '@yext/search-core';
import {
  combineStaticFilters,
  createDateRangeStaticFilter,
  createEqualsStaticFilter,
  createNearMeStaticFilter,
  createNumberRangeStaticFilter
} from '../../../src/utils/filter-creators';

describe('filter creators work properly', () => {
  it('builds an equality filter properly', () => {
    const expectedFilter = {
      kind: 'fieldValue',
      fieldId: 'someField',
      value: 'some value',
      matcher: Matcher.Equals
    };
    const actualFilter = createEqualsStaticFilter('someField', 'some value');

    expect(actualFilter).toEqual(expectedFilter);
  });

  it('builds a number range filter properly', () => {
    const expectedFilter = {
      kind: 'fieldValue',
      fieldId: 'someField',
      value: 5,
      matcher: Matcher.GreaterThan
    };
    const actualFilter = createNumberRangeStaticFilter(
      'someField',
      {
        min: {
          value: 5,
          inclusive: false
        }
      }
    );

    expect(actualFilter).toEqual(expectedFilter);
  });

  it('builds a date range filter properly', () => {
    const endDate = new Date('September 22, 2014');

    const expectedFilter = {
      kind: 'fieldValue',
      fieldId: 'someField',
      value: endDate,
      matcher: Matcher.LessThan
    };
    const actualFilter = createDateRangeStaticFilter(
      'someField',
      {
        max: {
          value: endDate,
          inclusive: false
        }
      }
    );

    expect(actualFilter).toEqual(expectedFilter);
  });

  it('builds a near me filter properly', () => {
    const location = {
      lat: 1234,
      lng: 5678,
      radius: 50
    };

    const expectedFilter = {
      kind: 'fieldValue',
      fieldId: 'builtin.location',
      value: location,
      matcher: Matcher.Near
    };
    const actualFilter = createNearMeStaticFilter(location);

    expect(actualFilter).toEqual(expectedFilter);
  });

  it('combines static filters into a conjunction properly', () => {
    const filterA = createEqualsStaticFilter('someField', 'some value');
    const filterB: StaticFilter = {
      kind: 'disjunction',
      combinator: FilterCombinator.OR,
      filters: [
        createEqualsStaticFilter('otherField', 'other value'),
        createEqualsStaticFilter('differentField', 'different value')
      ]
    };

    const expectedConjunctionFilter = {
      kind: 'conjunction',
      filters: [filterA, filterB],
      combinator: FilterCombinator.AND
    };
    const actualFilter = combineStaticFilters(filterA, filterB, FilterCombinator.AND);

    expect(actualFilter).toEqual(expectedConjunctionFilter);

    const filterC = createEqualsStaticFilter('separateField', 'separate value');
    const expectedNestedFilter = {
      kind: 'conjunction',
      filters: [expectedConjunctionFilter, filterC],
      combinator: FilterCombinator.AND
    };
    const actualNestedFilter = combineStaticFilters(actualFilter, filterC, FilterCombinator.AND);

    expect(actualNestedFilter).toEqual(expectedNestedFilter);
  });

  it('combines static filters into a disjunction properly', () => {
    const filterA = createEqualsStaticFilter('someField', 'some value');
    const filterB = createEqualsStaticFilter('otherField', 'other value');

    const expectedDisjunctionFilter = {
      kind: 'disjunction',
      filters: [filterA, filterB],
      combinator: FilterCombinator.OR
    };
    const actualFilter = combineStaticFilters(filterA, filterB, FilterCombinator.OR);

    expect(actualFilter).toEqual(expectedDisjunctionFilter);

    const filterC = createEqualsStaticFilter('separateField', 'separate value');
    const expectedNestedFilter = {
      kind: 'disjunction',
      filters: [expectedDisjunctionFilter, filterC],
      combinator: FilterCombinator.OR
    };
    const actualNestedFilter = combineStaticFilters(actualFilter, filterC, FilterCombinator.OR);

    expect(actualNestedFilter).toEqual(expectedNestedFilter);
  });

  it('throws an error when trying to combine conjunction static filters into a disjunction', () => {
    const filterA = createEqualsStaticFilter('someField', 'some value');
    const filterB = createEqualsStaticFilter('otherField', 'other value');
    const filterC = createEqualsStaticFilter('separateField', 'separate value');

    const conjunctionFilter: ConjunctionStaticFilter = {
      kind: 'conjunction',
      filters: [filterA, filterB],
      combinator: FilterCombinator.AND
    };

    expect(() => {
      combineStaticFilters(conjunctionFilter, filterC, FilterCombinator.OR);
    }).toThrow('Cannot combine conjunction filters in a disjunction');
  });
});
