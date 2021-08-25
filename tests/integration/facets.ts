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
  const initialState = {
    filters: {
      facets: [facet]
    }
  };
  return [initialState, facetOption];
}