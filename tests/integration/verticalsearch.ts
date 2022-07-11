import { AppliedQueryFilter, Matcher, Result, Source, VerticalResults, VerticalSearchRequest, VerticalSearchResponse } from '@yext/search-core';
import HttpManager from '../../src/http-manager';
import { AllResultsForVertical } from '../../src/models/slices/vertical';
import { State } from '../../src/models/state';
import { SearchTypeEnum } from '../../src/models/utils/searchType';
import { getHttpHeaders } from '../../src/utils/client-sdk-utils';
import { createMockedAnswersHeadless } from '../mocks/createMockedAnswersHeadless';
import setTimeout from '../utils/setTimeout';

const initialState: State = {
  query: {
    input: 'virginia',
  },
  vertical: {
    verticalKey: '123'
  },
  directAnswer: {},
  universal: {},
  queryRules: { actions: [] },
  filters: {},
  sessionTracking: {},
  spellCheck: {
    enabled: true,
  },
  searchStatus: {},
  meta: {
    searchType: SearchTypeEnum.Vertical
  },
  location: {}
};

const alternativeVerticals: VerticalResults[] = [{
  verticalKey: '999',
  source: Source.KnowledgeManager,
  resultsCount: 1,
  results: [{
    description: 'Sushi is a traditional Japanese dish',
    name: 'Sushi',
    rawData: {
      name: 'Sushi',
      description: 'Sushi is a traditional Japanese dish'
    },
    source: Source.KnowledgeManager,
  }],
  queryDurationMillis: 30,
  appliedQueryFilters: []
}];

const allResultsForVertical: VerticalSearchResponse = {
  queryId: 'SOME_ID',
  verticalResults: {
    appliedQueryFilters: [],
    queryDurationMillis: 0,
    results: [],
    resultsCount: 0,
    source: Source.KnowledgeManager,
    verticalKey: 'SOME_KEY'
  },
  uuid: ''
};

it('vertical searches set allResultsForVertical and alternativeVerticals', async () => {
  const answers = createMockedAnswersHeadless({
    verticalSearch: () => Promise.resolve({
      allResultsForVertical,
      alternativeVerticals,
    })
  }, initialState);
  await answers.executeVerticalQuery();
  const expectedAllResultsForVertical: AllResultsForVertical = {
    facets: [],
    results: [],
    resultsCount: 0
  };
  const expectedNoResultsState = {
    allResultsForVertical: expectedAllResultsForVertical,
    alternativeVerticals
  };
  expect(answers.state.vertical.noResults).toEqual(expectedNoResultsState);
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
  answers.setVertical('vertical-key');
  await answers.executeVerticalQuery();
  expect(mockSearch.mock.calls[0][0].query).toEqual('');
});

it('answers.setVerticalLimit sets the vertical limit when a number is passed to it', () => {
  const answers = createMockedAnswersHeadless();
  answers.setVerticalLimit(7);
  expect(answers.state.vertical.limit).toEqual(7);
});


it('handle a rejected promise from core', async () => {
  const mockSearch = createMockRejectedSearch();
  const mockCore = { verticalSearch: mockSearch };
  const httpManager = new HttpManager();
  const answers = createMockedAnswersHeadless(mockCore, {}, undefined, undefined, httpManager);
  answers.setVertical('vertical-key');
  try {
    await answers.executeVerticalQuery();
  } catch (e) {
    expect(e).toEqual('mock error message');
  }
  expect(answers.state.searchStatus.isLoading).toEqual(false);
  expect(httpManager.getLatestResponseId('verticalQuery')).toEqual(1);
});

it('executeVerticalQuery passes the additional HTTP headers', async () => {
  const mockSearch = createMockSearch();
  const answers = createMockedAnswersHeadless({
    verticalSearch: mockSearch
  });
  answers.setVertical('vertical-key');
  await answers.executeVerticalQuery();
  expect(mockSearch).toHaveBeenLastCalledWith(expect.objectContaining({
    additionalHttpHeaders: getHttpHeaders()
  }));
});

function createMockSearch() {
  return jest.fn(async (_request: VerticalSearchRequest) => {
    await setTimeout(0);
    return Promise.resolve({});
  });
}

function createMockRejectedSearch() {
  return jest.fn(async (_request: VerticalSearchRequest) => {
    await setTimeout(0);
    return Promise.reject('mock error message');
  });
}