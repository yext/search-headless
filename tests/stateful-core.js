import { Matcher } from '@yext/answers-core';
import StatefulCore from '../src/stateful-core';

describe("setters work as expected", () => {
  const mockedState = {};
  const mockedStateManager = {
    getState: jest.fn(() => mockedState),
    dispatchEvent: jest.fn((type, payload) => {}),
    addEventListener: jest.fn(listener => {})
  };
  const statefulCore = new StatefulCore(null, mockedStateManager);

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
  })
});