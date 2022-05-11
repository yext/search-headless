import { createMockedAnswersHeadless } from '../mocks/createMockedAnswersHeadless';
import { FeaturedSnippetDirectAnswer, DirectAnswerType, Source } from '@yext/answers-core';
import { State } from '../../src/models/state';
import { SearchTypeEnum } from '../../src/models/utils/searchType';

const initialState: State = {
  query: {
    input: 'virginia',
    mostRecentSearch: 'virginia'
  },
  vertical: {},
  directAnswer: {},
  universal: {},
  queryRules: { actions: [] },
  filters: {},
  spellCheck: {
    enabled: true,
  },
  searchStatus: {},
  sessionTracking: {},
  location: {},
  meta: {
    searchType: SearchTypeEnum.Universal
  }
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
    matchedSubstrings: [{ offset: 0, length: 3 }]
  }
};

describe('AnswersHeadless spellcheck interactions properly update state', () => {
  it('executeVerticalQuery properly updates direct answer state', async () => {
    const answers = createMockedAnswersHeadless({
      verticalSearch: () => Promise.resolve({ directAnswer: featuredSnippedDirectAnswer })
    }, initialState);
    answers.setVertical('123');
    await answers.executeVerticalQuery();
    const expectedState = {
      ...initialState,
      directAnswer: {
        result: featuredSnippedDirectAnswer
      },
      meta: {
        searchType: SearchTypeEnum.Vertical
      }
    };

    expect(answers.state).toMatchObject(expectedState);
  });

  it('executeUniversalQuery properly updates direct answer state', async () => {
    const answers = createMockedAnswersHeadless({
      universalSearch: () => Promise.resolve({ directAnswer: featuredSnippedDirectAnswer })
    }, initialState);
    answers.setUniversal();
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
    answers.setUniversal();
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