import { createMockedAnswersHeadless } from '../mocks/createMockedAnswersHeadless';
import { FeaturedSnippetDirectAnswer, DirectAnswerType, Source} from '@yext/answers-core';

const initialState = {
  query: {
    latest: 'virginia',
    query: 'virginia'
  },
  vertical: {
    key: '123'
  },
  directAnswer: {},
  universal: {},
  filters: {},
  spellCheck: {
    enabled: true,
  },
};

const featuredSnippedDirectAnswer: FeaturedSnippetDirectAnswer = {
  type: DirectAnswerType.FeaturedSnippet,
  relatedResult: {
    rawData: {},
    source: Source.KnowledgeManager
  },
  verticalKey: 'people',
  fieldType: 'c_name',
  snippet: {
    value: 'Bob',
    matchedSubstrings: [{ offset: 0, length: 3}]
  }
};

function mockSearchWithFeaturedSnippedDirectAnswer() {
  return Promise.resolve({
    directAnswer: featuredSnippedDirectAnswer
  });
}

describe('AnswersHeadless spellcheck interactions properly update state', () => {
  it('executeVerticalQuery properly updates direct answer state', async () => {
    const answers = createMockedAnswersHeadless({
      verticalSearch: mockSearchWithFeaturedSnippedDirectAnswer
    }, initialState);
    await answers.executeVerticalQuery();
    const expectedState = {
      ...initialState,
      directAnswer: {
        result: featuredSnippedDirectAnswer
      }
    };

    expect(answers.state).toMatchObject(expectedState);
  });
});