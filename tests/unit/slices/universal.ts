import { Source, VerticalResults } from '@yext/answers-core';
import createUniversalSlice from '../../../src/slices/universal';

const { reducer, actions } = createUniversalSlice('');
const { setVerticals } = actions;

describe('universal slice reducer works as expected', () => {
  it('setVerticals action is handled properly', () => {
    const mockVerticals: VerticalResults[] = [{
      appliedQueryFilters: [],
      queryDurationMillis: 100,
      results: [],
      resultsCount: 0,
      source: Source.KnowledgeManager,
      verticalKey: 'test'
    }];
    const expectedState = { verticals: mockVerticals };
    const actualState = reducer({}, setVerticals(mockVerticals));
    expect(actualState).toEqual(expectedState);
  });
});