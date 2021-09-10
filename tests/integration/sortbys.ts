import { Direction, SortType, VerticalSearchRequest } from '@yext/answers-core';
import { createMockedStatefulCore } from '../mocks/createMockedStatefulCore';

it('executeVerticalQuery properly updates spellcheck state', async () => {
  const mockSearch = jest.fn((_request: VerticalSearchRequest) => Promise.resolve({}));
  const statefulCore = createMockedStatefulCore({
    verticalSearch: mockSearch
  });
  statefulCore.setQuery('lol');
  statefulCore.setVerticalKey('vertical-key');
  statefulCore.setSortBys([
    {
      type: SortType.Field,
      field: 'c_field',
      direction: Direction.Ascending
    }
  ]);
  await statefulCore.executeVerticalQuery();
  expect(mockSearch.mock.calls[0][0].sortBys).toMatchObject([
    {
      direction: 'ASC',
      field: 'c_field',
      type: 'FIELD'
    }
  ]);
});
