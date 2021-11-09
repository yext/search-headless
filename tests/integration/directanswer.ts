import { createMockedAnswersHeadless } from '../mocks/createMockedAnswersHeadless';
import { FeaturedSnippetDirectAnswer, DirectAnswerType, Source } from '@yext/answers-core';

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

describe('AnswersHeadless spellcheck interactions properly update state', () => {
  it('executeVerticalQuery properly updates direct answer state', async () => {
    const answers = createMockedAnswersHeadless({
      verticalSearch: () => Promise.resolve({ directAnswer: featuredSnippedDirectAnswer })
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

  it('executeUniversalQuery properly updates direct answer state', async () => {
    const answers = createMockedAnswersHeadless({
      universalSearch: () => Promise.resolve({ directAnswer: featuredSnippedDirectAnswer })
    }, initialState);
    await answers.executeUniversalQuery();
    const expectedState = {
      ...initialState,
      directAnswer: {
        result: featuredSnippedDirectAnswer
      }
    };

    expect(answers.state).toMatchObject(expectedState);
  });

  it('An undefined direct answer results in an undefined direct answer state', async () => {
    const initialStateWithDA = {
      ...initialState,
      directAnswer: { result: featuredSnippedDirectAnswer }
    };
    const answers = createMockedAnswersHeadless({
      universalSearch: () => Promise.resolve({ directAnswer: undefined })
    }, initialStateWithDA);
    await answers.executeUniversalQuery();
    const expectedState = {
      ...initialState,
      directAnswer: {
        result: undefined
      }
    };

    expect(answers.state).toMatchObject(expectedState);
  });
});