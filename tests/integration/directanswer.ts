import { createMockedSearchHeadless } from '../mocks/createMockedSearchHeadless';
import { FeaturedSnippetDirectAnswer, DirectAnswerType, Source } from '@yext/search-core';
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

describe('SearchHeadless spellcheck interactions properly update state', () => {
  it('executeVerticalQuery properly updates direct answer state', async () => {
    const search = createMockedSearchHeadless({
      verticalSearch: () => Promise.resolve({ directAnswer: featuredSnippedDirectAnswer })
    }, initialState);
    search.setVertical('123');
    await search.executeVerticalQuery();
    const expectedState = {
      ...initialState,
      directAnswer: {
        result: featuredSnippedDirectAnswer
      },
      meta: {
        searchType: SearchTypeEnum.Vertical
      }
    };

    expect(search.state).toMatchObject(expectedState);
  });

  it('executeUniversalQuery properly updates direct answer state', async () => {
    const search = createMockedSearchHeadless({
      universalSearch: () => Promise.resolve({ directAnswer: featuredSnippedDirectAnswer })
    }, initialState);
    search.setUniversal();
    await search.executeUniversalQuery();
    const expectedState = {
      ...initialState,
      directAnswer: {
        result: featuredSnippedDirectAnswer
      }
    };

    expect(search.state).toMatchObject(expectedState);
  });

  it('An undefined direct answer results in an undefined direct answer state', async () => {
    const initialStateWithDA = {
      ...initialState,
      directAnswer: { result: featuredSnippedDirectAnswer }
    };
    const search = createMockedSearchHeadless({
      universalSearch: () => Promise.resolve({ directAnswer: undefined })
    }, initialStateWithDA);
    search.setUniversal();
    await search.executeUniversalQuery();
    const expectedState = {
      ...initialState,
      directAnswer: {
        result: undefined
      }
    };

    expect(search.state).toMatchObject(expectedState);
  });
});