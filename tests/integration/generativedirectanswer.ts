import { GenerativeDirectAnswerRequest, GenerativeDirectAnswerResponse, Source } from '@yext/search-core';
import { createMockedHeadless } from '../mocks/createMockedHeadless';
import { State } from '../../src/models/state';
import { SearchTypeEnum } from '../../src/models/utils/searchType';
import setTimeout from '../utils/setTimeout';

const initialState: State = {
  query: {
    mostRecentSearch: 'virginia'
  },
  vertical: {},
  directAnswer: {},
  universal: {
    verticals: [{
      'appliedQueryFilters': [],
      'queryDurationMillis': 1,
      'results': [
        {
          'rawData': {
            'uid': '123'
          },
          'source': Source.KnowledgeManager
        }
      ],
      'resultsCount': 1,
      'source': Source.KnowledgeManager,
      'verticalKey': 'restaurants'
    }]
  },
  queryRules: { actions: [] },
  filters: {},
  spellCheck: {
    enabled: true,
  },
  searchStatus: {},
  sessionTracking: {},
  location: {},
  meta: {
    uuid: 'someUuid',
    searchType: SearchTypeEnum.Universal
  },
  generativeDirectAnswer: {},
};

const mockResponse: GenerativeDirectAnswerResponse = {
  directAnswer: 'answer text',
  resultStatus: 'success',
  citations: ['123']
};

it('generative direct answer update the state as expected', async () => {
  const mockGenerativeDirectAnswer = createMockGenerativeDirectAnswer();
  const answers = createMockedHeadless({
    generativeDirectAnswer: mockGenerativeDirectAnswer
  }, initialState);

  const gda = answers.executeGenerativeDirectAnswer();
  expect(answers.state.generativeDirectAnswer.isLoading).toEqual(true);
  await gda;
  expect(answers.state.generativeDirectAnswer.response).toEqual(mockResponse);
  expect(answers.state.generativeDirectAnswer.isLoading).toEqual(false);
});

it('handle a rejected promise from core', async () => {
  const mockGenerativeDirectAnswer = createMockRejectedGenerativeDirectAnswer();
  const answers = createMockedHeadless({
    generativeDirectAnswer: mockGenerativeDirectAnswer
  }, initialState);
  const gda = answers.executeGenerativeDirectAnswer();
  expect(answers.state.generativeDirectAnswer.isLoading).toEqual(true);
  try {
    await gda;
  } catch (e) {
    expect(e).toEqual('mock error message');
  }
  expect(answers.state.generativeDirectAnswer.isLoading).toEqual(false);
});

function createMockGenerativeDirectAnswer() {
  return jest.fn(async (_request: GenerativeDirectAnswerRequest) => {
    await setTimeout(0);
    return Promise.resolve(mockResponse);
  });
}

function createMockRejectedGenerativeDirectAnswer() {
  return jest.fn(async (_request: GenerativeDirectAnswerRequest) => {
    await setTimeout(0);
    return Promise.reject('mock error message');
  });
}