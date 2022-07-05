import { UniversalSearchRequest, VerticalSearchRequest } from '@yext/search-core';
import { createMockedSearchHeadless } from '../mocks/createMockedSearchHeadless';
import setTimeout from '../utils/setTimeout';

it('universal searches update the search loading state', async () => {
  const mockSearch = createMockSearch();
  const answers = createMockedSearchHeadless({
    universalSearch: mockSearch
  });

  const search = answers.executeUniversalQuery();
  expect(answers.state.searchStatus.isLoading).toEqual(true);
  await search;
  expect(answers.state.searchStatus.isLoading).toEqual(false);
});

it('vertical searches update the search loading state', async () => {
  const mockSearch = createMockSearch();
  const answers = createMockedSearchHeadless({
    verticalSearch: mockSearch
  });
  answers.setVertical('vertical-key');
  const search = answers.executeVerticalQuery();
  expect(answers.state.searchStatus.isLoading).toEqual(true);
  await search;
  expect(answers.state.searchStatus.isLoading).toEqual(false);
});

function createMockSearch() {
  return jest.fn(async (_request: UniversalSearchRequest | VerticalSearchRequest) => {
    await setTimeout(0);
    return Promise.resolve({});
  });
}
