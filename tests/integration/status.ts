import { UniversalSearchRequest, VerticalSearchRequest } from '@yext/answers-core';
import { createMockedAnswersHeadless } from '../mocks/createMockedAnswersHeadless';
import setTimeout from '../utils/setTimeout';

it('universal searches update the search loading state', async () => {
  const mockSearch = createMockSearch();
  const answers = createMockedAnswersHeadless({
    universalSearch: mockSearch
  });

  const search = answers.executeUniversalQuery();
  expect(answers.state.searchStatus.isLoading).toEqual(true);
  await search;
  expect(answers.state.searchStatus.isLoading).toEqual(false);
});

it('vertical searches update the search loading state', async () => {
  const mockSearch = createMockSearch();
  const answers = createMockedAnswersHeadless({
    verticalSearch: mockSearch
  });
  answers.setVerticalKey('vertical-key');
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
