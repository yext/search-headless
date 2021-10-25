import { VerticalSearchRequest } from '@yext/answers-core';
import { createMockedAnswersHeadless } from '../mocks/createMockedAnswersHeadless';
import setTimeout from '../utils/setTimeout';

it('vertical searches send blank queries by default', async () => {
  const mockSearch = createMockSearch();
  const answers = createMockedAnswersHeadless({
    verticalSearch: mockSearch
  });
  answers.setVerticalKey('vertical-key');
  await answers.executeVerticalQuery();
  expect(mockSearch.mock.calls[0][0].query).toEqual('');
});

it('vertical searches update the search loading state', async () => {
  const mockSearch = createMockSearch();
  const answers = createMockedAnswersHeadless({
    verticalSearch: mockSearch
  });
  answers.setVerticalKey('vertical-key');
  const search = answers.executeVerticalQuery();
  expect(answers.state.vertical.searchLoading).toEqual(true);
  await search;
  expect(answers.state.vertical.searchLoading).toEqual(false);
});

it('answers.setVerticalLimit sets the vertical limit when a number is passed to it', () => {
  const answers = createMockedAnswersHeadless();
  answers.setVerticalLimit(7);
  expect(answers.state.vertical.limit).toEqual(7);
});

function createMockSearch() {
  return jest.fn(async (_request: VerticalSearchRequest) => {
    await setTimeout(0);
    return Promise.resolve({});
  });
}