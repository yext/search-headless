import { createMockedAnswersHeadless } from '../mocks/createMockedAnswersHeadless';

const initialState = {
  query: {
    latest: 'virginia',
    query: 'virginia'
  },
  vertical: {
    verticalKey: '123'
  },
  universal: {},
  filters: {},
  spellCheck: {
    enabled: true,
  },
};

const alternativeVerticals = [{
  verticalKey: '999',
  source: 'KNOWLEDGE_MANAGER',
  resultsCount: 1,
  results: [{
    description: 'Sushi is a traditional Japanese dish',
    name: 'Sushi',
    rawData: {
      name: 'Sushi',
      description: 'Sushi is a traditional Japanese dish'
    },
    source: 'KNOWLEDGE_MANAGER',
  }],
  queryDurationMillis: 30,
  appliedQueryFilters: []
}];

function mockSearchWithAlternativeVerticals() {
  return Promise.resolve({
    alternativeVerticals: alternativeVerticals
  });
}

describe('AnswersHeadless spellcheck interactions properly update state', () => {
  it('executeVerticalQuery properly updates alternative verticals state', async () => {
    const answers = createMockedAnswersHeadless({
      verticalSearch: mockSearchWithAlternativeVerticals
    }, initialState);
    await answers.executeVerticalQuery();
    const expectedState = {
      vertical: {
        ...initialState.vertical,
        alternativeVerticals: alternativeVerticals
      },
    };

    expect(answers.state).toMatchObject(expectedState);
  });
});