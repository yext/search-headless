import { UniversalSearchRequest, VerticalSearchRequest } from '@yext/search-core';
import { createMockedSearchHeadless } from '../mocks/createMockedSearchHeadless';

it('by default no meta attributes are sent', async () => {
  const mockSearch = jest.fn((_request: VerticalSearchRequest) => Promise.resolve({}));
  const search = createMockedSearchHeadless({
    verticalSearch: mockSearch
  });
  search.setQuery('lol');
  search.setVertical('vertical-key');
  await search.executeVerticalQuery();
  expect(mockSearch.mock.calls[0][0].context).toEqual(undefined);
  expect(mockSearch.mock.calls[0][0].referrerPageUrl).toEqual(undefined);
});

it('vertical searches send meta data', async () => {
  const mockSearch = jest.fn((_request: VerticalSearchRequest) => Promise.resolve({}));
  const search = createMockedSearchHeadless({
    verticalSearch: mockSearch
  });
  search.setQuery('lol');
  search.setVertical('vertical-key');
  search.setContext({
    monke: 'cdawg',
    iron: {
      mouse: 'tsun'
    }
  });
  search.setReferrerPageUrl('monkey');
  await search.executeVerticalQuery();
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
  const search = createMockedSearchHeadless({
    universalSearch: mockSearch
  });
  search.setQuery('lol');
  search.setUniversal();
  search.setContext({
    monke: 'cdawg',
    iron: {
      mouse: 'tsun'
    }
  });
  search.setReferrerPageUrl('monkey');
  await search.executeUniversalQuery();
  expect(mockSearch.mock.calls[0][0].context).toEqual({
    monke: 'cdawg',
    iron: {
      mouse: 'tsun'
    }
  });
  expect(mockSearch.mock.calls[0][0].referrerPageUrl).toEqual('monkey');
});

it('universal searches update the uuid', async () => {
  const mockSearch = jest.fn((_request: UniversalSearchRequest) => Promise.resolve({
    uuid: 123
  }));
  const search = createMockedSearchHeadless({
    universalSearch: mockSearch
  });
  search.setUniversal();
  search.setQuery('lol');
  await search.executeUniversalQuery();
  expect(search.state.meta.uuid).toEqual(123);
});

it('vertical searches update the uuid', async () => {
  const mockSearch = jest.fn((_request: UniversalSearchRequest) => Promise.resolve({
    uuid: 456
  }));
  const search = createMockedSearchHeadless({
    verticalSearch: mockSearch
  });
  search.setQuery('lol');
  search.setVertical('test');
  await search.executeVerticalQuery();
  expect(search.state.meta.uuid).toEqual(456);
});