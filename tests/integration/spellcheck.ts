import { createMockedSearchHeadless } from '../mocks/createMockedSearchHeadless';

const initialState = {
  query: {
    mostRecentSearch: 'virginia',
    input: 'virginia'
  },
  vertical: {},
  universal: {},
  filters: {},
  spellCheck: {
    enabled: true,
  },
};

const spellCheckResult = {
  correctedQuery: 'yext',
  originalQuery: 'yeet',
  type: 'SUGGEST'
};

function mockSearchWithSpellcheck() {
  return Promise.resolve({
    spellCheck: spellCheckResult
  });
}

describe('SearchHeadless spellcheck interactions properly update state', () => {
  it('executeVerticalQuery properly updates spellcheck state', async () => {
    const search = createMockedSearchHeadless({
      verticalSearch: mockSearchWithSpellcheck
    }, initialState);
    search.setVertical('123');
    await search.executeVerticalQuery();
    const expectedState = {
      vertical: {
        ...initialState.vertical
      },
      spellCheck: {
        ...initialState.spellCheck,
        ...spellCheckResult,
      }
    };

    expect(search.state).toMatchObject(expectedState);
  });

  it('executeUniversalQuery properly updates spellcheck state', async () => {
    const search = createMockedSearchHeadless({
      universalSearch: mockSearchWithSpellcheck
    }, initialState);
    search.setUniversal();
    await search.executeUniversalQuery();
    const expectedState = {
      spellCheck: {
        ...initialState.spellCheck,
        ...spellCheckResult,
      }
    };

    expect(search.state).toMatchObject(expectedState);
  });

  it('setSpellCheckEnabled properly updates state', async () => {
    const search = createMockedSearchHeadless({}, initialState);
    await search.setSpellCheckEnabled(false);
    const expectedState = {
      spellCheck: {
        enabled: false
      }
    };

    expect(search.state).toMatchObject(expectedState);
  });
});