import { FilterCombinator, Matcher } from '@yext/search-core';
import { combineFilters, createDateRangeFilter, createEqualsFilter, createNearMeFilter, createNumberRangeFilter } from '../../../src/utils/filter-creators';

describe('filter creators work properly', () => {
  it('builds an equality filter properly', () => {
    const expectedFilter = {
      fieldId: 'someField',
      value: 'some value',
      matcher: Matcher.Equals
    };
    const actualFilter = createEqualsFilter('someField', 'some value');

    expect(actualFilter).toEqual(expectedFilter);
  });

  it('builds a number range filter properly', () => {
    const expectedFilter = {
      fieldId: 'someField',
      value: 5,
      matcher: Matcher.GreaterThan
    };
    const actualFilter = createNumberRangeFilter(
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
      fieldId: 'someField',
      value: endDate,
      matcher: Matcher.LessThan
    };
    const actualFilter = createDateRangeFilter(
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
      fieldId: 'builtin.location',
      value: location,
      matcher: Matcher.Near
    };
    const actualFilter = createNearMeFilter(location);

    expect(actualFilter).toEqual(expectedFilter);
  });

  it('builds a combined filter properly', () => {
    const filterA = createEqualsFilter('someField', 'some value');
    const filterB = createEqualsFilter('otherField', 'other value');

    const expectedFilter = {
      filters: [filterA, filterB],
      combinator: FilterCombinator.AND
    };
    const actualFilter = combineFilters(filterA, filterB, FilterCombinator.AND);

    expect(actualFilter).toEqual(expectedFilter);
  });
});