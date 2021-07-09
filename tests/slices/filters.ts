import { Matcher } from '@yext/answers-core';
import reducer, { setStatic } from '../../src/slices/filters';

describe('filter slice reducer works as expected', () => {
  it('setStatic action is handled properly', () => {
    const filter = {
      fieldId: 'someField',
      value: 'some value',
      matcher: Matcher.Equals
    };

    const actualState = reducer({}, setStatic(filter));
    const expectedState = {
      static: filter
    };

    expect(actualState).toEqual(expectedState);
  });
});