import { createMockedHeadless } from '../mocks/createMockedHeadless';

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
  type: 'SUGGEST',
  matchedSubstrings: [{
    offset: 0,
    length: 4
  }]
};

function mockSearchWithSpellcheck() {
  return Promise.resolve({
    spellCheck: spellCheckResult
  });
}

describe('SearchHeadless spellcheck interactions properly update state', () => {
  it('executeVerticalQuery properly updates spellcheck state', async () => {
    const answers = createMockedHeadless({
      verticalSearch: mockSearchWithSpellcheck
    }, initialState);
    answers.setVertical('123');
    await answers.executeVerticalQuery();
    const expectedState = {
      vertical: {
        ...initialState.vertical
      },
      spellCheck: {
        ...initialState.spellCheck,
        ...spellCheckResult,
      }
    };

    expect(answers.state).toMatchObject(expectedState);
  });

  it('executeUniversalQuery properly updates spellcheck state', async () => {
    const answers = createMockedHeadless({
      universalSearch: mockSearchWithSpellcheck
    }, initialState);
    answers.setUniversal();
    await answers.executeUniversalQuery();
    const expectedState = {
      spellCheck: {
        ...initialState.spellCheck,
        ...spellCheckResult,
      }
    };

    expect(answers.state).toMatchObject(expectedState);
  });

  it('setSpellCheckEnabled properly updates state', async () => {
    const answers = createMockedHeadless({}, initialState);
    await answers.setSpellCheckEnabled(false);
    const expectedState = {
      spellCheck: {
        enabled: false
      }
    };

    expect(answers.state).toMatchObject(expectedState);
  });
});