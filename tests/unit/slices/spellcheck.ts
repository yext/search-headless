import { SpellCheck, SpellCheckType } from '@yext/search-core';
import createSpellCheckSlice from '../../../src/slices/spellcheck';

const { reducer, actions } = createSpellCheckSlice('');
const { setResult, setEnabled } = actions;

describe('spellCheck slice reducer works as expected', () => {
  it('setResult action is handled properly', () => {
    const initialState = {
      enabled: true
    };
    const spellCheck: SpellCheck = {
      correctedQuery: 'yext',
      originalQuery: 'yeet',
      type: SpellCheckType.Suggest,
      matchedSubstrings: [{
        offset: 0,
        length: 4
      }]
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