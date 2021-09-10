import { UniversalSearchRequest, VerticalSearchRequest } from '@yext/answers-core';
import { createMockedStatefulCore } from '../mocks/createMockedStatefulCore';

it('by default no meta attributes are sent', async () => {
  const mockSearch = jest.fn((_request: VerticalSearchRequest) => Promise.resolve({}));
  const statefulCore = createMockedStatefulCore({
    verticalSearch: mockSearch
  });
  statefulCore.setQuery('lol');
  statefulCore.setVerticalKey('vertical-key');
  await statefulCore.executeVerticalQuery();
  expect(mockSearch.mock.calls[0][0].context).toEqual(undefined);
  expect(mockSearch.mock.calls[0][0].referrerPageUrl).toEqual(undefined);
});

it('vertical searches send meta data', async () => {
  const mockSearch = jest.fn((_request: VerticalSearchRequest) => Promise.resolve({}));
  const statefulCore = createMockedStatefulCore({
    verticalSearch: mockSearch
  });
  statefulCore.setQuery('lol');
  statefulCore.setVerticalKey('vertical-key');
  statefulCore.setContext({
    monke: 'cdawg',
    iron: {
      mouse: 'tsun'
    }
  });
  statefulCore.setReferrerPageUrl('monkey');
  await statefulCore.executeVerticalQuery();
  expect(mockSearch.mock.calls[0][0].context).toEqual({
    monke: 'cdawg',
    iron: {
      mouse: 'tsun'
    }
  });
  expect(mockSearch.mock.calls[0][0].referrerPageUrl).toEqual('monkey');
});

it('universal searches send context', async () => {
  const mockSearch = jest.fn((_request: UniversalSearchRequest) => Promise.resolve({}));
  const statefulCore = createMockedStatefulCore({
    universalSearch: mockSearch
  });
  statefulCore.setQuery('lol');
  statefulCore.setVerticalKey('vertical-key');
  statefulCore.setContext({
    monke: 'cdawg',
    iron: {
      mouse: 'tsun'
    }
  });
  statefulCore.setReferrerPageUrl('monkey');
  await statefulCore.executeUniversalQuery();
  expect(mockSearch.mock.calls[0][0].context).toEqual({
    monke: 'cdawg',
    iron: {
      mouse: 'tsun'
    }
  });
  expect(mockSearch.mock.calls[0][0].referrerPageUrl).toEqual('monkey');
});
