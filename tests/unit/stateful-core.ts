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
  meta: {}
};
const mockedStateManager: any = {
  getState: jest.fn(() => mockedState),
  dispatchEvent: jest.fn(),
  addEventListener: jest.fn()
};

const mockedSearch = jest.fn(() => { return { queryId: '123' };});
const mockedCore: any = {
  verticalAutocomplete: jest.fn(),
  universalAutocomplete: jest.fn(),
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

    const dispatchEventCalls = mockedStateManager.dispatchEvent.mock.calls;
    expect(dispatchEventCalls.length).toBe(1);
    expect(dispatchEventCalls[0][0]).toBe('vertical/setAutoComplete');

    const coreCalls = mockedCore.verticalAutocomplete.mock.calls;
    expect(coreCalls.length).toBe(1);
    expect(coreCalls[0][0]).toEqual(
      { input: mockedState.query.query, verticalKey: mockedState.vertical.key });
  });

  it('universal auto-complete works', async () => {
    await statefulCore.executeUniversalAutoComplete();

    const dispatchEventCalls = mockedStateManager.dispatchEvent.mock.calls;
    expect(dispatchEventCalls.length).toBe(1);
    expect(dispatchEventCalls[0][0]).toBe('universal/setAutoComplete');

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

    const dispatchEventCalls = mockedStateManager.dispatchEvent.mock.calls;
    expect(dispatchEventCalls.length).toBe(4);
    expect(dispatchEventCalls[0][0]).toBe('universal/setResults');
    expect(dispatchEventCalls[1][0]).toBe('query/setQueryId');
    expect(dispatchEventCalls[2][0]).toBe('query/setLatest');
    expect(dispatchEventCalls[3][0]).toBe('spellCheck/setResult');

    const coreCalls = mockedCore.universalSearch.mock.calls;
    expect(coreCalls.length).toBe(1);
    expect(coreCalls[0][0]).toEqual({
      ...mockedState.query,
      skipSpellCheck: !mockedState.spellCheck.enabled
    });
  });

  it('vertical search works', async () => {
    await statefulCore.executeVerticalQuery();

    const dispatchEventCalls = mockedStateManager.dispatchEvent.mock.calls;
    expect(dispatchEventCalls.length).toBe(6);
    expect(dispatchEventCalls[0][0]).toBe('vertical/setResults');
    expect(dispatchEventCalls[1][0]).toBe('query/setQueryId');
    expect(dispatchEventCalls[2][0]).toBe('query/setLatest');
    expect(dispatchEventCalls[3][0]).toBe('filters/setFacets');
    expect(dispatchEventCalls[4][0]).toBe('spellCheck/setResult');
    expect(dispatchEventCalls[5][0]).toBe('vertical/setAlternativeVerticals');

    const coreCalls = mockedCore.verticalSearch.mock.calls;
    const expectedSearchParams = {
      ...mockedState.query,
      verticalKey: mockedState.vertical.key,
      staticFilters: mockedState.filters.static,
      retrieveFacets: true,
      limit: mockedState.vertical.limit,
      offset: mockedState.vertical.offset,
      skipSpellCheck: !mockedState.spellCheck.enabled,
    };
    expect(coreCalls.length).toBe(1);
    expect(coreCalls[0][0]).toEqual(expectedSearchParams);
  });
});