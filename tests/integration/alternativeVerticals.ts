import { createMockedStatefulCore } from '../mocks/createMockedStatefulCore';

const initialState = {
  query: {
    latest: 'virginia',
    query: 'virginia'
  },
  vertical: {
    key: '123'
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

describe('StatefulCore spellcheck interactions properly update state', () => {
  it('executeVerticalQuery properly updates alternative verticals state', async () => {
    const statefulCore = createMockedStatefulCore({
      verticalSearch: mockSearchWithAlternativeVerticals
    }, initialState);
    await statefulCore.executeVerticalQuery();
    const expectedState = {
      ...initialState,
      vertical: {
        ...initialState.vertical,
        alternativeVerticals: alternativeVerticals,
        results: {
          alternativeVerticals: alternativeVerticals
        }
      },
    };

    expect(statefulCore.state).toEqual(expectedState);
  });
});