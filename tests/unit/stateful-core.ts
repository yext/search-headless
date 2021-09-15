import { Matcher, QuerySource, QueryTrigger } from '@yext/answers-core';
import StatefulCore from '../../src/stateful-core';

const mockedState = {
  query: {
    query: 'Search',
    querySource: QuerySource.Standard,
    queryTrigger: QueryTrigger.Initialize
  },
  vertical: {
    key: 'someKey',
    offset: 0,
    limit: 20
  },
  filters: {
    static: {
      fieldId: 'c_someField',
      matcher: Matcher.Equals,
      value: 'some value'
    }
  },
  spellCheck: {
    enabled: true
  },
  session: {
    trackingEnabled: true,
    sessionId: 'random-id-number'
  },
  meta: {},
  location: {}
};
const mockedStateManager: any = {
  getState: jest.fn(() => mockedState),
  dispatchEvent: jest.fn(),
  addEventListener: jest.fn()
};

const mockedSearch = jest.fn(() => { return { queryId: '123' };});
const mockedCore: any = {
  verticalAutocomplete: jest.fn(() => { return {}; }),
  universalAutocomplete: jest.fn(() => { return {}; }),
  universalSearch: mockedSearch,
  verticalSearch: mockedSearch
};

const statefulCore = new StatefulCore(mockedCore, mockedStateManager);

describe('setters work as expected', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('setFilter works as expected', () => {
    const filter = {
      fieldId: 'c_someField',
      matcher: Matcher.Equals,
      value: 'someValue'
    };
    statefulCore.setFilter(filter);

    const dispatchEventCalls =
      mockedStateManager.dispatchEvent.mock.calls;

    expect(dispatchEventCalls.length).toBe(1);
    expect(dispatchEventCalls[0][0]).toBe('filters/setStatic');
    expect(dispatchEventCalls[0][1]).toBe(filter);
  });

  it('setSessionTrackingEnabled works as expected', () => {
    statefulCore.setSessionTrackingEnabled(true);

    const dispatchEventCalls =
      mockedStateManager.dispatchEvent.mock.calls;

    expect(dispatchEventCalls.length).toBe(1);
    expect(dispatchEventCalls[0][0]).toBe('session/setTrackingEnabled');
    expect(dispatchEventCalls[0][1]).toBe(true);
  });

  it('setSessionId works as expected', () => {
    statefulCore.setSessionId('random-id-number');

    const dispatchEventCalls =
      mockedStateManager.dispatchEvent.mock.calls;

    expect(dispatchEventCalls.length).toBe(1);
    expect(dispatchEventCalls[0][0]).toBe('session/setSessionId');
    expect(dispatchEventCalls[0][1]).toBe('random-id-number');
  });

  it('setQuery works as expected', () => {
    const query = 'Hello';
    statefulCore.setQuery(query);

    const dispatchEventCalls =
      mockedStateManager.dispatchEvent.mock.calls;

    expect(dispatchEventCalls.length).toBe(1);
    expect(dispatchEventCalls[0][0]).toBe('query/set');
    expect(dispatchEventCalls[0][1]).toBe(query);
  });

  it('setQueryTrigger works as expected', () => {
    statefulCore.setQueryTrigger(QueryTrigger.Initialize);

    const dispatchEventCalls =
      mockedStateManager.dispatchEvent.mock.calls;

    expect(dispatchEventCalls.length).toBe(1);
    expect(dispatchEventCalls[0][0]).toBe('query/setTrigger');
    expect(dispatchEventCalls[0][1]).toBe(QueryTrigger.Initialize);
  });

  it('setQuerySource works as expected', () => {
    statefulCore.setQuerySource(QuerySource.Overlay);

    const dispatchEventCalls =
      mockedStateManager.dispatchEvent.mock.calls;

    expect(dispatchEventCalls.length).toBe(1);
    expect(dispatchEventCalls[0][0]).toBe('query/setSource');
    expect(dispatchEventCalls[0][1]).toBe(QuerySource.Overlay);
  });

  it('setVerticalKey works as expected', () => {
    const verticalKey = 'key';
    statefulCore.setVerticalKey(verticalKey);

    const dispatchEventCalls =
      mockedStateManager.dispatchEvent.mock.calls;

    expect(dispatchEventCalls.length).toBe(1);
    expect(dispatchEventCalls[0][0]).toBe('vertical/setKey');
    expect(dispatchEventCalls[0][1]).toBe(verticalKey);
  });

  it('setState works as expected', () => {
    const state: any = { query: {} };
    statefulCore.setState(state);

    const dispatchEventCalls =
      mockedStateManager.dispatchEvent.mock.calls;

    expect(dispatchEventCalls.length).toBe(1);
    expect(dispatchEventCalls[0][0]).toBe('set-state');
    expect(dispatchEventCalls[0][1]).toBe(state);
  });

  it('setLimit works as expected', () => {
    const limit = 12;
    statefulCore.setLimit(limit);

    const dispatchEventCalls =
      mockedStateManager.dispatchEvent.mock.calls;

    expect(dispatchEventCalls.length).toBe(1);
    expect(dispatchEventCalls[0][0]).toBe('vertical/setLimit');
    expect(dispatchEventCalls[0][1]).toBe(limit);
  });

  it('setOffset works as expected', () => {
    const offset = 12;
    statefulCore.setOffset(offset);

    const dispatchEventCalls =
      mockedStateManager.dispatchEvent.mock.calls;

    expect(dispatchEventCalls.length).toBe(1);
    expect(dispatchEventCalls[0][0]).toBe('vertical/setOffset');
    expect(dispatchEventCalls[0][1]).toBe(offset);
  });
});

describe('auto-complete works as expected', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('vertical auto-complete works', async () => {
    await statefulCore.executeVerticalAutoComplete();

    const coreCalls = mockedCore.verticalAutocomplete.mock.calls;
    expect(coreCalls.length).toBe(1);
    expect(coreCalls[0][0]).toEqual(
      { input: mockedState.query.query, verticalKey: mockedState.vertical.key });
  });

  it('universal auto-complete works', async () => {
    await statefulCore.executeUniversalAutoComplete();

    const coreCalls = mockedCore.universalAutocomplete.mock.calls;
    expect(coreCalls.length).toBe(1);
    expect(coreCalls[0][0]).toEqual({ input: mockedState.query.query });
  });
});

describe('search works as expected', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('universal search works', async () => {
    await statefulCore.executeUniversalQuery();

    const coreCalls = mockedCore.universalSearch.mock.calls;
    expect(coreCalls.length).toBe(1);
    expect(coreCalls[0][0]).toEqual({
      ...mockedState.query,
      skipSpellCheck: !mockedState.spellCheck.enabled,
      sessionId: mockedState.session.sessionId,
      sessionTrackingEnabled: mockedState.session.trackingEnabled
    });
  });

  it('vertical search works', async () => {
    await statefulCore.executeVerticalQuery();

    const coreCalls = mockedCore.verticalSearch.mock.calls;
    const expectedSearchParams = {
      ...mockedState.query,
      verticalKey: mockedState.vertical.key,
      staticFilters: mockedState.filters.static,
      retrieveFacets: true,
      limit: mockedState.vertical.limit,
      offset: mockedState.vertical.offset,
      skipSpellCheck: !mockedState.spellCheck.enabled,
      sessionId: mockedState.session.sessionId,
      sessionTrackingEnabled: mockedState.session.trackingEnabled
    };
    expect(coreCalls.length).toBe(1);
    expect(coreCalls[0][0]).toEqual(expectedSearchParams);
  });
});