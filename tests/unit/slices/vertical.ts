import createVerticalSlice from '../../../src/slices/vertical';

const { reducer, actions } = createVerticalSlice('');
const { setVerticalKey, setLimit, setOffset, setDisplayName } = actions;

describe('vertical slice reducer works as expected', () => {
  it('setVerticalKey action is handled properly', () => {
    const verticalKey = 'someKey';
    const expectedState = { verticalKey };
    const actualState = reducer({}, setVerticalKey(verticalKey));

    expect(actualState).toEqual(expectedState);
  });

  it('setLimit action is handled properly', () => {
    const limit = 17;
    const expectedState = { limit: limit };
    const actualState = reducer({}, setLimit(limit));

    expect(actualState).toEqual(expectedState);
  });

  it('setOffset action is handled properly', () => {
    const offset = 4;
    const expectedState = { offset: offset };
    const actualState = reducer({}, setOffset(offset));

    expect(actualState).toEqual(expectedState);
  });

  it('setDisplayName action is handled properly', () => {
    const displayName = 'a display name';
    const expectedState = { displayName };
    const actualState = reducer({}, setDisplayName(displayName));

    expect(actualState).toEqual(expectedState);
  });
});