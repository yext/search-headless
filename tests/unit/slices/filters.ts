import { Matcher } from '@yext/answers-core';
import reducer, { setFacets, resetFacets, setStatic } from '../../../src/slices/filters';

describe('filter slice reducer works as expected', () => {
  it('setStatic action is handled properly', () => {
    const filter = {
      fieldId: 'someField',
      value: 'some value',
      matcher: Matcher.Equals
    };

    const actualState = reducer({}, setStatic(filter));
    const expectedState = {
      static: filter
    };

    expect(actualState).toEqual(expectedState);
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
    const expectedState = {
      facets: [
        {
          fieldId: 'someField',
          displayName: 'Some Field',
          options: [{
            matcher: Matcher.Equals,
            value: 'someValue',
            displayName: 'Some Value',
            count: 1,
            selected: false
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
            selected: false
          }]
        }
      ]
    };

    expect(actualState).toEqual(expectedState);
  });
});