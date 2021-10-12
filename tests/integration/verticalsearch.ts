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
  const mockSearch = createMockSearch();
  const statefulCore = createMockedStatefulCore({
    verticalSearch: mockSearch
  });
  statefulCore.setVerticalKey('vertical-key');
  const search = statefulCore.executeVerticalQuery();
  expect(statefulCore.state.vertical.searchLoading).toEqual(true);
  await search;
  expect(statefulCore.state.vertical.searchLoading).toEqual(false);
});

it('statefulCore.setVerticalLimit sets the vertical limit when a number is passed to it', () => {
  const statefulCore = createMockedStatefulCore();
  statefulCore.setVerticalLimit(7);
  expect(statefulCore.state.vertical.limit).toEqual(7);
});

function createMockSearch() {
  return jest.fn(async (_request: VerticalSearchRequest) => {
    await setTimeout(0);
    return Promise.resolve({});
  });
}