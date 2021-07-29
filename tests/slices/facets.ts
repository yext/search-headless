import reducer, { setFacets, setDisplayableFacets } from '../../src/slices/facets';

describe('facets slice reducer works as expected', () => {
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