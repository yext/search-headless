import { UniversalSearchRequest } from '@yext/answers-core';
import { createMockedStatefulCore } from '../mocks/createMockedStatefulCore';

it('universal searches send blank queries by default', async () => {
  const mockSearch = jest.fn((_request: UniversalSearchRequest) => Promise.resolve({}));
  const statefulCore = createMockedStatefulCore({
    universalSearch: mockSearch
  });
  await statefulCore.executeUniversalQuery();
  expect(mockSearch.mock.calls[0][0].query).toEqual('');
});
