import { UniversalSearchRequest, VerticalSearchRequest } from '@yext/answers-core';
import { createMockedHeadless } from '../mocks/createMockedHeadless';
import setTimeout from '../utils/setTimeout';

it('universal searches update the search loading state', async () => {
  const mockSearch = createMockSearch();
  const answers = createMockedHeadless({
    universalSearch: mockSearch
  });

  const search = answers.executeUniversalQuery();
  expect(answers.state.searchStatus.isLoading).toEqual(true);
  await search;
  expect(answers.state.searchStatus.isLoading).toEqual(false);
});

it('vertical searches update the search loading state', async () => {
  const mockSearch = createMockSearch();
  const answers = createMockedHeadless({
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
