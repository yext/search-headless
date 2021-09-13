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
  const mockSearch = createMockSearch();
  const statefulCore = createMockedStatefulCore({
    universalSearch: mockSearch
  });

  const search = statefulCore.executeUniversalQuery();
  expect(statefulCore.state.universal.searchLoading).toEqual(true);
  await search;
  expect(statefulCore.state.universal.searchLoading).toEqual(false);
});

function createMockSearch() {
  return jest.fn(async (_request: UniversalSearchRequest) => {
    await setTimeout(0);
    return Promise.resolve({});
  });
}
