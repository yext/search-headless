import reducer, { setSessionId, setEnabled } from '../../../src/slices/sessiontracking';

describe('sessionTracking slice reducer works as expected', () => {
  it('setSessionId action is handled properly', () => {
    const initialState = {
      enabled: true
    };
    const sessionId = '017bea48-ea11-17ed-e812-d9ce357b6d34';
    const expectedState = { ...initialState, sessionId: sessionId };
    const actualState = reducer(initialState, setSessionId(sessionId));

    expect(actualState).toEqual(expectedState);
  });

  it('setTrackingEnabled action is handled properly', () => {
    const initialState = { enabled: false };
    const expectedState = { enabled: true };
    const actualState = reducer(initialState, setEnabled(true));

    expect(actualState).toEqual(expectedState);
  });
});