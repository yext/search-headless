import { VerticalSearchRequest } from '@yext/answers-core';
import { createMockedStatefulCore } from '../mocks/createMockedStatefulCore';
import setTimeout from '../utils/setTimeout';

it('vertical searches send blank queries by default', async () => {
  const mockSearch = createMockSearch();
  const statefulCore = createMockedStatefulCore({
    verticalSearch: mockSearch
  });
  statefulCore.setVerticalKey('vertical-key');
  await statefulCore.executeVerticalQuery();
  expect(mockSearch.mock.calls[0][0].query).toEqual('');
});

it('vertical searches update the search loading state', async () => {
  // No need to be conservative about wait times
  const mockSearch = createMockSearch([0, 1, 2]);
  const statefulCore = createMockedStatefulCore({
    verticalSearch: mockSearch
  });
  statefulCore.setVerticalKey('vertical-key');
  expect(statefulCore.state.vertical.numSearchesRunning).toEqual(0);
  expect(statefulCore.state.vertical.searchIsLoading).toBeFalsy();

  const firstSearch = statefulCore.executeVerticalQuery();
  const secondSearch = statefulCore.executeVerticalQuery();
  const thirdSearch = statefulCore.executeVerticalQuery();
  expect(statefulCore.state.vertical.numSearchesRunning).toEqual(3);
  expect(statefulCore.state.vertical.searchIsLoading).toBeTruthy();

  await firstSearch;
  expect(statefulCore.state.vertical.numSearchesRunning).toEqual(2);
  expect(statefulCore.state.vertical.searchIsLoading).toBeTruthy();

  await secondSearch;
  expect(statefulCore.state.vertical.numSearchesRunning).toEqual(1);
  expect(statefulCore.state.vertical.searchIsLoading).toBeTruthy();

  await thirdSearch;
  expect(statefulCore.state.vertical.numSearchesRunning).toEqual(0);
  expect(statefulCore.state.vertical.searchIsLoading).toBeFalsy();

  expect(mockSearch.mock.calls[0][0].query).toEqual('');
});

function createMockSearch(times?: number[]) {
  let index = 0;
  return jest.fn(async (_request: VerticalSearchRequest) => {
    const timeout = (times && times[index++]) || 0;
    await setTimeout(timeout);
    return Promise.resolve({});
  });
}