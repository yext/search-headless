import { UniversalSearchRequest } from '@yext/answers-core';
import { createMockedStatefulCore } from '../mocks/createMockedStatefulCore';
import setTimeout from '../utils/setTimeout';

it('universal searches send blank queries by default', async () => {
  const mockSearch = createMockSearch();
  const statefulCore = createMockedStatefulCore({
    universalSearch: mockSearch
  });
  await statefulCore.executeUniversalQuery();
  expect(mockSearch.mock.calls[0][0].query).toEqual('');
});


it('universal searches update the search loading state', async () => {
  // No need to be conservative about wait times
  const mockSearch = createMockSearch([0, 1, 2]);
  const statefulCore = createMockedStatefulCore({
    universalSearch: mockSearch
  });
  expect(statefulCore.state.universal.numSearchesRunning).toEqual(0);
  expect(statefulCore.state.universal.searchIsLoading).toBeFalsy();

  const firstSearch = statefulCore.executeUniversalQuery();
  const secondSearch = statefulCore.executeUniversalQuery();
  const thirdSearch = statefulCore.executeUniversalQuery();
  expect(statefulCore.state.universal.numSearchesRunning).toEqual(3);
  expect(statefulCore.state.universal.searchIsLoading).toBeTruthy();

  await firstSearch;
  expect(statefulCore.state.universal.numSearchesRunning).toEqual(2);
  expect(statefulCore.state.universal.searchIsLoading).toBeTruthy();

  await secondSearch;
  expect(statefulCore.state.universal.numSearchesRunning).toEqual(1);
  expect(statefulCore.state.universal.searchIsLoading).toBeTruthy();

  await thirdSearch;
  expect(statefulCore.state.universal.numSearchesRunning).toEqual(0);
  expect(statefulCore.state.universal.searchIsLoading).toBeFalsy();

  expect(mockSearch.mock.calls[0][0].query).toEqual('');
});

function createMockSearch(times?: number[]) {
  let index = 0;
  return jest.fn(async (_request: UniversalSearchRequest) => {
    const timeout = (times && times[index++]) || 0;
    await setTimeout(timeout);
    return Promise.resolve({});
  });
}
