import { Direction, SortType, VerticalSearchRequest } from '@yext/search-core';
import { createMockedSearchHeadless } from '../mocks/createMockedSearchHeadless';

it('executeVerticalQuery properly updates spellcheck state', async () => {
  const mockSearch = jest.fn((_request: VerticalSearchRequest) => Promise.resolve({}));
  const search = createMockedSearchHeadless({
    verticalSearch: mockSearch
  });
  search.setQuery('lol');
  search.setVertical('vertical-key');
  search.setSortBys([
    {
      type: SortType.Field,
      field: 'c_field',
      direction: Direction.Ascending
    }
  ]);
  await search.executeVerticalQuery();
  expect(mockSearch.mock.calls[0][0].sortBys).toMatchObject([
    {
      direction: 'ASC',
      field: 'c_field',
      type: 'FIELD'
    }
  ]);
});
