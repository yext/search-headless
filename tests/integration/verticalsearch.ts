import { AppliedQueryFilter, Matcher, Result, Source, VerticalSearchRequest } from '@yext/answers-core';
import { createMockedAnswersHeadless } from '../mocks/createMockedAnswersHeadless';
import setTimeout from '../utils/setTimeout';

const initialState = {
  query: {
    latest: 'virginia',
    query: 'virginia'
  },
  vertical: {
    verticalKey: '123'
  },
  directAnswer: {},
  universal: {},
  filters: {},
  spellCheck: {
    enabled: true,
  },
};

it('vertical searches set allResultsForVertical', async () => {
  const answers = createMockedAnswersHeadless({
    verticalSearch: () => Promise.resolve({
      allResultsForVertical: {
        facets: [],
        verticalResults: {
          results: [],
          resultsCount: 0
        },
        searchIntents: []
      }
    })
  }, initialState);
  const expectedAllResultsForVertical = {
    facets: [],
    results: [],
    resultsCount: 0,
    searchIntents: []
  };
  await answers.executeVerticalQuery();
  expect(answers.state.vertical.allResultsForVertical).toEqual(expectedAllResultsForVertical);
});

it('vertical searches set appliedQueryFilters', async () => {
  const mockAppliedQueryFilters: AppliedQueryFilter[] = [{
    displayKey: 'tesKey',
    displayValue: 'testValue',
    filter: {
      fieldId: 'test',
      matcher: Matcher.Equals,
      value: 42
    }
  }];
  const answers = createMockedAnswersHeadless({
    verticalSearch: () => Promise.resolve({
      verticalResults: {
        appliedQueryFilters: mockAppliedQueryFilters
      }
    })
  }, initialState);
  await answers.executeVerticalQuery();
  expect(answers.state.vertical.appliedQueryFilters).toEqual(mockAppliedQueryFilters);
});

it('vertical searches set queryDurationMillis', async () => {
  const answers = createMockedAnswersHeadless({
    verticalSearch: () => Promise.resolve({
      verticalResults: {
        queryDurationMillis: 42
      }
    })
  }, initialState);
  await answers.executeVerticalQuery();
  expect(answers.state.vertical.queryDurationMillis).toEqual(42);
});

it('vertical searches set results', async () => {
  const mockResults: Result[] = [{
    rawData: { test: 'hello' },
    source: Source.KnowledgeManager
  }];
  const answers = createMockedAnswersHeadless({
    verticalSearch: () => Promise.resolve({
      verticalResults: {
        results: mockResults
      }
    })
  }, initialState);
  await answers.executeVerticalQuery();
  expect(answers.state.vertical.results).toEqual(mockResults);
});

it('vertical searches set results count', async () => {
  const answers = createMockedAnswersHeadless({
    verticalSearch: () => Promise.resolve({
      verticalResults: {
        resultsCount: 3
      }
    })
  }, initialState);
  await answers.executeVerticalQuery();
  expect(answers.state.vertical.resultsCount).toEqual(3);
});

it('vertical searches set the source', async () => {
  const answers = createMockedAnswersHeadless({
    verticalSearch: () => Promise.resolve({
      verticalResults: {
        source: Source.KnowledgeManager
      }
    })
  }, initialState);
  await answers.executeVerticalQuery();
  expect(answers.state.vertical.source).toEqual(Source.KnowledgeManager);
});

it('vertical searches send blank queries by default', async () => {
  const mockSearch = createMockSearch();
  const answers = createMockedAnswersHeadless({
    verticalSearch: mockSearch
  });
  answers.setVerticalKey('vertical-key');
  await answers.executeVerticalQuery();
  expect(mockSearch.mock.calls[0][0].query).toEqual('');
});

it('vertical searches update the search loading state', async () => {
  const mockSearch = createMockSearch();
  const answers = createMockedAnswersHeadless({
    verticalSearch: mockSearch
  });
  answers.setVerticalKey('vertical-key');
  const search = answers.executeVerticalQuery();
  expect(answers.state.vertical.searchLoading).toEqual(true);
  await search;
  expect(answers.state.vertical.searchLoading).toEqual(false);
});

it('answers.setVerticalLimit sets the vertical limit when a number is passed to it', () => {
  const answers = createMockedAnswersHeadless();
  answers.setVerticalLimit(7);
  expect(answers.state.vertical.limit).toEqual(7);
});

function createMockSearch() {
  return jest.fn(async (_request: VerticalSearchRequest) => {
    await setTimeout(0);
    return Promise.resolve({});
  });
}