import { UniversalSearchRequest } from '@yext/search-core';
import HttpManager from '../../src/http-manager';
import { getHttpHeaders } from '../../src/utils/client-sdk-utils';
import { createMockedSearchHeadless } from '../mocks/createMockedSearchHeadless';
import setTimeout from '../utils/setTimeout';

it('universal searches send blank queries by default', async () => {
  const mockSearch = createMockSearch();
  const search = createMockedSearchHeadless({
    universalSearch: mockSearch
  });
  await search.executeUniversalQuery();
  expect(mockSearch.mock.calls[0][0].query).toEqual('');
});

it('search.setUniversalLimit sets the universal limit when a UniversalLimit is passed to it', () => {
  const search = createMockedSearchHeadless();
  const universalLimit = {
    faq: 5,
    people: 5
  };
  search.setUniversalLimit(universalLimit);
  expect(search.state.universal.limit).toEqual(universalLimit);
});

it('search.setRestrictVerticals sets the restrictVerticals param', async () => {
  const mockSearch = createMockSearch();
  const search = createMockedSearchHeadless({
    universalSearch: mockSearch
  });
  search.setRestrictVerticals(['KM', 'people']);
  await search.executeUniversalQuery();
  expect(mockSearch.mock.calls[0][0].restrictVerticals).toEqual(['KM', 'people']);
});

it('handle a rejected promise from core', async () => {
  const mockSearch = createMockRejectedSearch();
  const mockCore = { universalSearch: mockSearch };
  const httpManager = new HttpManager();
  const search = createMockedSearchHeadless(mockCore, {}, undefined, undefined, httpManager);
  try {
    await search.executeUniversalQuery();
  } catch (e) {
    expect(e).toEqual('mock error message');
  }
  expect(search.state.searchStatus.isLoading).toEqual(false);
  expect(httpManager.getLatestResponseId('universalQuery')).toEqual(1);
});

it('executeUniversalQuery passes the additional HTTP headers', async () => {
  const mockSearch = createMockSearch();
  const search = createMockedSearchHeadless({
    universalSearch: mockSearch
  });
  await search.executeUniversalQuery();
  expect(mockSearch).toHaveBeenLastCalledWith(expect.objectContaining({
    additionalHttpHeaders: getHttpHeaders()
  }));
});

function createMockSearch() {
  return jest.fn(async (_request: UniversalSearchRequest) => {
    await setTimeout(0);
    return Promise.resolve({});
  });
}

function createMockRejectedSearch() {
  return jest.fn(async (_request: UniversalSearchRequest) => {
    await setTimeout(0);
    return Promise.reject('mock error message');
  });
}
