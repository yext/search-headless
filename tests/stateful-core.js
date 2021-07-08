import { Matcher, QuerySource, QueryTrigger } from '@yext/answers-core';
import StatefulCore from '../src/stateful-core';

const mockedState = {
  query: {
    query: 'Search'
  },
  vertical: {
    key: 'someKey'
  }
};
const mockedStateManager = {
  getState: jest.fn(() => mockedState),
  dispatchEvent: jest.fn(),
  addEventListener: jest.fn()
};

const mockedCore = {
  verticalAutocomplete: jest.fn(),
  universalAutocomplete: jest.fn()
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
    const state = { query: {} };
    statefulCore.setState(state);

    const dispatchEventCalls =
      mockedStateManager.dispatchEvent.mock.calls;

    expect(dispatchEventCalls.length).toBe(1);
    expect(dispatchEventCalls[0][0]).toBe('set-state');
    expect(dispatchEventCalls[0][1]).toBe(state);
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