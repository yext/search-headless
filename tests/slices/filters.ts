import { Matcher } from '@yext/answers-core';
import reducer, { setStatic, setFacets, setDisplayableFacets } from '../../src/slices/filters';

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
    const facets = [{
        fieldId: 'someField',
        options:[{
        matcher: null,
        value: 'Technology'
        }]
    },
    {
        fieldId: 'someField2',
        options:[{
          matcher: null,
          value: 'Technology2'
          }]
    }];
    const actualState = reducer({}, setFacets(facets));
    const expectedState = {
      facets: facets
    };
    expect(actualState).toEqual(expectedState);
  });

  it('setDisplayableFacets action is handled properly', () => {
    const displayableFacets = [{
        fieldId: 'someField',
        displayName: 'someDisplay',
        options:[{
            displayName: 'Technology',
            count: 3,
            selected: true,
            matcher: null,
            value: 'Technology'
        }]}];
    const actualState = reducer({}, setDisplayableFacets(displayableFacets));
    const expectedState = {
      displayableFacets: displayableFacets
    };
    expect(actualState).toEqual(expectedState);
  });
});