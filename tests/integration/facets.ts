import { DisplayableFacet, DisplayableFacetOption, Matcher } from '@yext/answers-core';
import { State } from '../../src/models/state';
import { createMockedStatefulCore } from '../mocks/createMockedStatefulCore';

it('can select a facet option', () => {
  const [initialState, facetOption] = createInitialState(false);
  const statefulCore = createMockedStatefulCore({}, initialState);
  statefulCore.selectFacetOption('testFieldId', facetOption);
  expect(statefulCore.state.filters.facets[0].options[0]).toEqual({
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
    options: [{...facetOption}]
  });
  const statefulCore = createMockedStatefulCore({}, initialState);
  statefulCore.selectFacetOption('testFieldId', facetOption);
  expect(statefulCore.state.filters.facets).toEqual([
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
  const statefulCore = createMockedStatefulCore({}, initialState);
  statefulCore.selectFacetOption('testFieldId', facetOption);
  expect(statefulCore.state.filters.facets[0].options).toEqual([
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
  const statefulCore = createMockedStatefulCore({}, initialState);
  statefulCore.unselectFacetOption('testFieldId', facetOption);
  expect(statefulCore.state.filters.facets[0].options[0]).toEqual({
    matcher: Matcher.Equals,
    value: 'testValue',
    displayName: 'testDisplayName',
    count: 96,
    selected: false
  });
});

it('gives a console warning when facets do not exist in state', () => {
  const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation();
  const statefulCore = createMockedStatefulCore();
  statefulCore.selectFacetOption('testFieldId', {} as DisplayableFacetOption);
  expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
  consoleWarnSpy.mockClear();
});

it('gives a console warning when the facet option\'s fieldId is not found in state', () => {
  const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation();
  const [initialState] = createInitialState(true);
  const statefulCore = createMockedStatefulCore({}, initialState);
  statefulCore.selectFacetOption('fakeFieldId', {} as DisplayableFacetOption);
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
    vertical: { key: 'test vertical key' },
    query: { query: 'test query' },
    spellCheck: { enabled: true }
  };
  const statefulCore = createMockedStatefulCore(mockAnswersCore, initialState);
  expect(statefulCore.state.filters.facets).toEqual(undefined);
  await statefulCore.executeVerticalQuery();
  expect(statefulCore.state.filters.facets).toEqual([ 'mock facets state' ]);
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
  const statefulCore = createMockedStatefulCore(mockedCore, initialState);
  statefulCore.executeVerticalQuery();
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
  const statefulCore = createMockedStatefulCore({}, initialState);
  const facet = statefulCore.state.filters.facets[0];
  const searchedFacet = statefulCore.utilities.searchThroughFacet(facet, 'cation');
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

it('can set facets correctly', () => {
  const [initialState, facetOption] = createInitialState(true);
  const statefulCore = createMockedStatefulCore({}, initialState);
  const facets = [
    {
      fieldId: 'newFieldId',
      displayName: 'new test facet name',
      options: [facetOption]
    }
  ];
  statefulCore.setFacets(facets);
  expect(statefulCore.state.filters.facets).toEqual(facets);
});

it('can reset facets correctly', () => {
  const [initialState, ] = createInitialState(true);
  const statefulCore = createMockedStatefulCore({}, initialState);
  statefulCore.resetFacets();
  statefulCore.state.filters.facets.map(facet =>
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
      query: 'test'
    },
    filters: {
      facets: [facet]
    },
    vertical: {
      key: 'people'
    },
    universal: {},
    spellCheck: {
      enabled: false
    },
    meta: {}
  };
  return [initialState, facetOption];
}