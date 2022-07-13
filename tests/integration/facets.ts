import { DisplayableFacet, DisplayableFacetOption, Matcher } from '@yext/search-core';
import { State } from '../../src/models/state';
import { SearchTypeEnum } from '../../src/models/utils/searchType';
import { createMockedHeadless } from '../mocks/createMockedHeadless';

it('can select a facet option', () => {
  const [initialState, facetOption] = createInitialState(false);
  const answers = createMockedHeadless({}, initialState);
  answers.setFacetOption('testFieldId', facetOption, true);
  expect(answers.state.filters.facets[0].options[0]).toEqual({
    matcher: Matcher.Equals,
    value: 'testValue',
    displayName: 'testDisplayName',
    count: 96,
    selected: true
  });
});

it('handles multiple facets with the same fieldId', () => {
  const [initialState, facetOption] = createInitialState(false);
  initialState.filters.facets.push({
    displayName: 'another test facet',
    fieldId: 'testFieldId',
    options: [{ ...facetOption }]
  });
  const answers = createMockedHeadless({}, initialState);
  answers.setFacetOption('testFieldId', facetOption, true);
  expect(answers.state.filters.facets).toEqual([
    {
      displayName: 'test facet name',
      fieldId: 'testFieldId',
      options: [{
        matcher: Matcher.Equals,
        value: 'testValue',
        displayName: 'testDisplayName',
        count: 96,
        selected: true
      }]
    },
    {
      displayName: 'another test facet',
      fieldId: 'testFieldId',
      options: [{
        matcher: Matcher.Equals,
        value: 'testValue',
        displayName: 'testDisplayName',
        count: 96,
        selected: true
      }]
    },
  ]);
});

it('handles selecting multiple facetOptions at the same time', () => {
  const [initialState, facetOption] = createInitialState(false);
  initialState.filters.facets[0].options.push({ ...facetOption });
  const answers = createMockedHeadless({}, initialState);
  answers.setFacetOption('testFieldId', facetOption, true);
  expect(answers.state.filters.facets[0].options).toEqual([
    {
      matcher: Matcher.Equals,
      value: 'testValue',
      displayName: 'testDisplayName',
      count: 96,
      selected: true
    },
    {
      matcher: Matcher.Equals,
      value: 'testValue',
      displayName: 'testDisplayName',
      count: 96,
      selected: true
    }
  ]);
});

it('can unselect a facet option', () => {
  const [initialState, facetOption] = createInitialState(true);
  const answers = createMockedHeadless({}, initialState);
  answers.setFacetOption('testFieldId', facetOption, false);
  expect(answers.state.filters.facets[0].options[0]).toEqual({
    matcher: Matcher.Equals,
    value: 'testValue',
    displayName: 'testDisplayName',
    count: 96,
    selected: false
  });
});

it('gives a console warning when facets do not exist in state', () => {
  const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation();
  const answers = createMockedHeadless();
  answers.setFacetOption('testFieldId', {} as DisplayableFacetOption, true);
  expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
  consoleWarnSpy.mockClear();
});

it('gives a console warning when the facet option\'s fieldId is not found in state', () => {
  const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation();
  const [initialState] = createInitialState(true);
  const answers = createMockedHeadless({}, initialState);
  answers.setFacetOption('fakeFieldId', {} as DisplayableFacetOption, true);
  expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
  consoleWarnSpy.mockClear();
});

it('facets are updated after a vertical search', async () => {
  function mockSearchWithFacets() {
    return Promise.resolve({
      facets: [
        'mock facets state'
      ]
    });
  }
  const mockAnswersCore = {
    verticalSearch: jest.fn().mockImplementation(mockSearchWithFacets)
  };
  const initialState = {
    filters: {},
    vertical: { verticalKey: 'test vertical key' },
    query: { input: 'test query' },
    spellCheck: { enabled: true }
  };
  const answers = createMockedHeadless(mockAnswersCore, initialState);
  expect(answers.state.filters.facets).toEqual(undefined);
  answers.setVertical('vertical-key');
  await answers.executeVerticalQuery();
  expect(answers.state.filters.facets).toEqual([ 'mock facets state' ]);
});

it('only selected facets are sent in the vertical search request', () => {
  const [initialState, selectedFacetOption] = createInitialState(true);
  const notSelectedFacetOption = { ...selectedFacetOption, selected: false };
  initialState.filters.facets.push({
    displayName: 'testFacet2',
    fieldId: 'testFieldId2',
    options: [selectedFacetOption, selectedFacetOption, notSelectedFacetOption]
  });
  initialState.filters.facets.push({
    displayName: 'testFacet3',
    fieldId: 'testFieldId3',
    options: [notSelectedFacetOption]
  });
  const mockedCore = {
    verticalSearch: jest.fn(() => { return {}; })
  };
  const answers = createMockedHeadless(mockedCore, initialState);
  answers.setVertical('vertical-key');
  answers.setFacets(initialState.filters.facets);
  answers.executeVerticalQuery();
  expect(mockedCore.verticalSearch).toHaveBeenCalledWith(expect.objectContaining({
    facets: [{
      fieldId: 'testFieldId',
      options: [selectedFacetOption]
    },
    {
      fieldId: 'testFieldId2',
      options: [selectedFacetOption, selectedFacetOption]
    },
    {
      fieldId: 'testFieldId3',
      options: []
    }]
  }));
});

it('searchThroughFacet filters facet options correctly', () => {
  const [initialState, facetOption] = createInitialState(false);
  initialState.filters.facets[0].options.push({
    ...facetOption,
    displayName: 'generation'
  });
  initialState.filters.facets[0].options.push({
    ...facetOption,
    displayName: 'cation'
  });
  initialState.filters.facets[0].options.push({
    ...facetOption,
    displayName: 'ignore me'
  });
  const answers = createMockedHeadless({}, initialState);
  const facet = answers.state.filters.facets[0];
  const searchedFacet = answers.utilities.searchThroughFacet(facet, 'cation');
  expect(searchedFacet).toEqual({
    displayName: 'test facet name',
    fieldId: 'testFieldId',
    options: [
      {
        ...facetOption,
        displayName: 'generation'
      },
      {
        ...facetOption,
        displayName: 'cation'
      }
    ]
  });
});

it('searchThroughFacet filters facet options correctly for similar searchTerm', () => {
  const [initialState, facetOption] = createInitialState(false);
  initialState.filters.facets[0].options.push({
    ...facetOption,
    displayName: 'generation'
  });
  initialState.filters.facets[0].options.push({
    ...facetOption,
    displayName: 'cation'
  });
  initialState.filters.facets[0].options.push({
    ...facetOption,
    displayName: 'Cation'
  });
  const answers = createMockedHeadless({}, initialState);
  const facet = answers.state.filters.facets[0];
  const searchedFacet = answers.utilities.searchThroughFacet(facet, 'car');
  expect(searchedFacet).toEqual({
    displayName: 'test facet name',
    fieldId: 'testFieldId',
    options: [
      {
        ...facetOption,
        displayName: 'cation'
      },
      {
        ...facetOption,
        displayName: 'Cation'
      }
    ]
  });
});

it('searchThroughFacet filters facet options correctly for short searchTerm', () => {
  const [initialState, facetOption] = createInitialState(false);
  initialState.filters.facets[0].options.push({
    ...facetOption,
    displayName: 'macaw'
  });
  initialState.filters.facets[0].options.push({
    ...facetOption,
    displayName: 'cation'
  });
  initialState.filters.facets[0].options.push({
    ...facetOption,
    displayName: 'Caution'
  });
  initialState.filters.facets[0].options.push({
    ...facetOption,
    displayName: 'ignore me'
  });
  const answers = createMockedHeadless({}, initialState);
  const facet = answers.state.filters.facets[0];
  const searchedFacet = answers.utilities.searchThroughFacet(facet, 'ca');
  expect(searchedFacet).toEqual({
    displayName: 'test facet name',
    fieldId: 'testFieldId',
    options: [
      {
        ...facetOption,
        displayName: 'macaw'
      },
      {
        ...facetOption,
        displayName: 'cation'
      },
      {
        ...facetOption,
        displayName: 'Caution'
      }
    ]
  });
});

it('can set facets correctly', () => {
  const [initialState, facetOption] = createInitialState(true);
  const answers = createMockedHeadless({}, initialState);
  const facets = [
    {
      fieldId: 'newFieldId',
      displayName: 'new test facet name',
      options: [facetOption]
    }
  ];
  answers.setFacets(facets);
  expect(answers.state.filters.facets).toEqual(facets);
});

it('can reset facets correctly', () => {
  const [initialState, ] = createInitialState(true);
  const answers = createMockedHeadless({}, initialState);
  answers.resetFacets();
  answers.state.filters.facets.map(facet =>
    facet.options.map(option => expect(option.selected).toBeFalsy())
  );
});


function createInitialState(
  facetIsSelected: boolean
): [initialState: Partial<State>, facetOption: DisplayableFacetOption] {
  const facetOption: DisplayableFacetOption = {
    matcher: Matcher.Equals,
    value: 'testValue',
    displayName: 'testDisplayName',
    count: 96,
    selected: facetIsSelected
  };
  const facet: DisplayableFacet = {
    fieldId: 'testFieldId',
    displayName: 'test facet name',
    options: [facetOption]
  };
  const initialState: Partial<State> = {
    query: {
      input: 'test'
    },
    filters: {
      facets: [facet]
    },
    vertical: {
      verticalKey: 'people'
    },
    universal: {},
    spellCheck: {
      enabled: false
    },
    meta: {
      searchType: SearchTypeEnum.Universal
    }
  };
  return [initialState, facetOption];
}