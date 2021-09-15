import reducer, { setSessionId, setTrackingEnabled } from '../../../src/slices/session';

describe('session slice reducer works as expected', () => {
  it('setSessionId action is handled properly', () => {
    const initialState = {
      trackingEnabled: true
    };
    const sessionId = '017bea48-ea11-17ed-e812-d9ce357b6d34';
    const expectedState = { ...initialState, sessionId: sessionId };
    const actualState = reducer(initialState, setSessionId(sessionId));

    expect(actualState).toEqual(expectedState);
  });

  it('setTrackingEnabled action is handled properly', () => {
    const initialState = { trackingEnabled: false };
    const expectedState = { trackingEnabled: true };
    const actualState = reducer(initialState, setTrackingEnabled(true));

    expect(actualState).toEqual(expectedState);
  });
});