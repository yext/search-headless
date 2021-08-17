import { createMockedStatefulCore } from "../mocks/createMockedStatefulCore";

const initialState = {
  query: {
    latest: 'virginia',
    query: 'virginia'
  },
  vertical: {
    key: '123',
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

describe('StatefulCore spellcheck interactions properly update state', () => {
  it('executeVerticalQuery properly updates spellcheck state', async () => {
    const statefulCore = createMockedStatefulCore({
      verticalSearch: mockSearchWithSpellcheck
    }, initialState);
    await statefulCore.executeVerticalQuery();
    const expectedState = {
      ...initialState,
      vertical: {
        ...initialState.vertical,
        results: {
          spellCheck: spellCheckResult
        }
      },
      spellCheck: {
        ...initialState.spellCheck,
        ...spellCheckResult,
      }
    };

    expect(statefulCore.state).toEqual(expectedState);
  });

  it('executeUniversalQuery properly updates spellcheck state', async () => {
    const statefulCore = createMockedStatefulCore({
      universalSearch: mockSearchWithSpellcheck
    }, initialState);
    await statefulCore.executeUniversalQuery();
    const expectedState = {
      ...initialState,
      universal: {
        results: {
          spellCheck: spellCheckResult
        },
      },
      spellCheck: {
        ...initialState.spellCheck,
        ...spellCheckResult,
      }
    };

    expect(statefulCore.state).toEqual(expectedState);
  });

  it('setSpellCheckEnabled properly updates state', async () => {
    const statefulCore = createMockedStatefulCore({}, initialState);
    await statefulCore.setSpellCheckEnabled(false);
    const expectedState = {
      ...initialState,
      spellCheck: {
        enabled: false
      }
    };

    expect(statefulCore.state).toEqual(expectedState);
  });
});