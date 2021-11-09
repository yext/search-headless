import { createMockedAnswersHeadless } from '../mocks/createMockedAnswersHeadless';

const initialState = {
  query: {
    latest: 'virginia',
    query: 'virginia'
  },
  vertical: {
    verticalKey: '123',
  },
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

describe('AnswersHeadless spellcheck interactions properly update state', () => {
  it('executeVerticalQuery properly updates spellcheck state', async () => {
    const answers = createMockedAnswersHeadless({
      verticalSearch: mockSearchWithSpellcheck
    }, initialState);
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
    const answers = createMockedAnswersHeadless({
      universalSearch: mockSearchWithSpellcheck
    }, initialState);
    await answers.executeUniversalQuery();
    const expectedState = {
      universal: {
        searchLoading: false
      },
      spellCheck: {
        ...initialState.spellCheck,
        ...spellCheckResult,
      }
    };

    expect(answers.state).toMatchObject(expectedState);
  });

  it('setSpellCheckEnabled properly updates state', async () => {
    const answers = createMockedAnswersHeadless({}, initialState);
    await answers.setSpellCheckEnabled(false);
    const expectedState = {
      spellCheck: {
        enabled: false
      }
    };

    expect(answers.state).toMatchObject(expectedState);
  });
});