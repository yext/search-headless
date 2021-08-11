import StatefulCore from '../src/stateful-core';
import ReduxStateManager from '../src/redux-state-manager';

const preloadedState = {
  query: {
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

const spellCheckResult = {
  correctedQuery: 'yext',
  originalQuery: 'yeet',
  type: 'SUGGEST'
};

const mockedVerticalSearch = jest.fn(() => {
  return {
    queryId: '123',
    spellCheck: spellCheckResult
  };
});

const mockedUniversalSearch = jest.fn(() => {
  return {
    queryId: '123',
    spellCheck: spellCheckResult
  };
});

const mockedCore = {
  verticalAutocomplete: jest.fn(),
  universalAutocomplete: jest.fn(),
  universalSearch: mockedUniversalSearch,
  verticalSearch: mockedVerticalSearch
};

let statefulCore;
let reduxStateManager;

describe('StatefulCore interactions properly update state', () => {
  beforeEach(() => {
    reduxStateManager = new ReduxStateManager(preloadedState);
    statefulCore = new StatefulCore(mockedCore, reduxStateManager);
  });

  it('executeVerticalQuery properly updates state', async () => {
    await statefulCore.executeVerticalQuery();
    const expectedState = {
      ...preloadedState,
      query: {
        query: 'virginia',
        queryId: '123'
      },
      vertical: {
        facets: undefined,
        key: '123',
        results: {
          queryId: '123',
          spellCheck: spellCheckResult
        }
      },
      spellCheck: {
        ...spellCheckResult,
        enabled: true
      }
    };

    expect(statefulCore.state).toEqual(expectedState);
  });

  it('executeUniversalQuery properly updates state', async () => {
    await statefulCore.executeUniversalQuery();
    const expectedState = {
      ...preloadedState,
      query: {
        query: 'virginia',
        queryId: '123'
      },
      universal: {
        results: {
          queryId: '123',
          spellCheck: spellCheckResult
        },
      },
      spellCheck: {
        ...spellCheckResult,
        enabled: true
      }
    };

    expect(statefulCore.state).toEqual(expectedState);
  });

  it('setSpellCheckEnabled properly updates state', async () => {
    await statefulCore.setSpellCheckEnabled(false);
    const expectedState = {
      ...preloadedState,
      spellCheck: {
        enabled: false
      }
    };

    expect(statefulCore.state).toEqual(expectedState);
  });
});