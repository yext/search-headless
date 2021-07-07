import { Matcher, QuerySource, QueryTrigger } from '@yext/answers-core';
import StatefulCore from '../src/stateful-core';

describe("setters work as expected", () => {
  const mockedState = {};
  const mockedStateManager = {
    getState: jest.fn(() => mockedState),
    dispatchEvent: jest.fn((type, payload) => {}),
    addEventListener: jest.fn(listener => {})
  };
  const statefulCore = new StatefulCore(null, mockedStateManager);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("setFilter works as expected", () => {
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

  it("setQuery works as expected", () => {
    const query = 'Hello';
    statefulCore.setQuery(query);

    const dispatchEventCalls = 
      mockedStateManager.dispatchEvent.mock.calls;

    expect(dispatchEventCalls.length).toBe(1);
    expect(dispatchEventCalls[0][0]).toBe('query/set');
    expect(dispatchEventCalls[0][1]).toBe(query);
  });

  it("setQueryTrigger works as expected", () => {
    statefulCore.setQueryTrigger(QueryTrigger.Initialize);

    const dispatchEventCalls = 
      mockedStateManager.dispatchEvent.mock.calls;

    expect(dispatchEventCalls.length).toBe(1);
    expect(dispatchEventCalls[0][0]).toBe('query/setTrigger');
    expect(dispatchEventCalls[0][1]).toBe(QueryTrigger.Initialize);
  });

  it("setQuerySource works as expected", () => {
    statefulCore.setQuerySource(QuerySource.Overlay);

    const dispatchEventCalls = 
      mockedStateManager.dispatchEvent.mock.calls;

    expect(dispatchEventCalls.length).toBe(1);
    expect(dispatchEventCalls[0][0]).toBe('query/setSource');
    expect(dispatchEventCalls[0][1]).toBe(QuerySource.Overlay);
  });

  it("setVerticalKey works as expected", () => {
    const verticalKey = 'key';
    statefulCore.setVerticalKey(verticalKey);

    const dispatchEventCalls = 
      mockedStateManager.dispatchEvent.mock.calls;

    expect(dispatchEventCalls.length).toBe(1);
    expect(dispatchEventCalls[0][0]).toBe('vertical/setKey');
    expect(dispatchEventCalls[0][1]).toBe(verticalKey);
  });

  it("setState works as expected", () => {
    const state = { query: {} };
    statefulCore.setState(state);

    const dispatchEventCalls = 
      mockedStateManager.dispatchEvent.mock.calls;

    expect(dispatchEventCalls.length).toBe(1);
    expect(dispatchEventCalls[0][0]).toBe('set-state');
    expect(dispatchEventCalls[0][1]).toBe(state);
  });
});