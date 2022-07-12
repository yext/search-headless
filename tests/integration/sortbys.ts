import { Direction, SortType, VerticalSearchRequest } from '@yext/search-core';
import { createMockedHeadless } from '../mocks/createMockedHeadless';

it('executeVerticalQuery properly updates spellcheck state', async () => {
  const mockSearch = jest.fn((_request: VerticalSearchRequest) => Promise.resolve({}));
  const answers = createMockedHeadless({
    verticalSearch: mockSearch
  });
  answers.setQuery('lol');
  answers.setVertical('vertical-key');
  answers.setSortBys([
    {
      type: SortType.Field,
      field: 'c_field',
      direction: Direction.Ascending
    }
  ]);
  await answers.executeVerticalQuery();
  expect(mockSearch.mock.calls[0][0].sortBys).toMatchObject([
    {
      direction: 'ASC',
      field: 'c_field',
      type: 'FIELD'
    }
  ]);
});
