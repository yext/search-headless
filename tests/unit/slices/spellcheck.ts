import { SpellCheck, SpellCheckType } from '@yext/answers-core';
import reducer, { setResult, setEnabled } from '../../../src/slices/spellcheck';

describe('spellCheck slice reducer works as expected', () => {
  it('setResult action is handled properly', () => {
    const initialState = {
      enabled: true
    };
    const spellCheck: SpellCheck = {
      correctedQuery: 'yext',
      originalQuery: 'yeet',
      type: SpellCheckType.Suggest
    };
    const expectedState = { ...initialState, ...spellCheck };
    const actualState = reducer({ enabled: true }, setResult(spellCheck));

    expect(actualState).toEqual(expectedState);
  });

  it('setEnabled action is handled properly', () => {
    const initialState = { enabled: false };
    const expectedState = { enabled: true };
    const actualState = reducer(initialState, setEnabled(true));

    expect(actualState).toEqual(expectedState);
  });
});