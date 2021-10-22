import { UniversalSearchRequest } from '@yext/answers-core';
import { createMockedAnswersHeadless } from '../mocks/createMockedAnswersHeadless';
import setTimeout from '../utils/setTimeout';

it('universal searches send blank queries by default', async () => {
  const mockSearch = createMockSearch();
  const answers = createMockedAnswersHeadless({
    universalSearch: mockSearch
  });
  await answers.executeUniversalQuery();
  expect(mockSearch.mock.calls[0][0].query).toEqual('');
});


it('universal searches update the search loading state', async () => {
  const mockSearch = createMockSearch();
  const answers = createMockedAnswersHeadless({
    universalSearch: mockSearch
  });

  const search = answers.executeUniversalQuery();
  expect(answers.state.universal.searchLoading).toEqual(true);
  await search;
  expect(answers.state.universal.searchLoading).toEqual(false);
});

it('answers.setUniversalLimit sets the universal limit when a UniversalLimit is passed to it', () => {
  const answers = createMockedAnswersHeadless();
  const universalLimit = {
    faq: 5,
    people: 5
  };
  answers.setUniversalLimit(universalLimit);
  expect(answers.state.universal.limit).toEqual(universalLimit);
});

function createMockSearch() {
  return jest.fn(async (_request: UniversalSearchRequest) => {
    await setTimeout(0);
    return Promise.resolve({});
  });
}
