import { UniversalSearchRequest } from '@yext/answers-core';
import HttpManager from '../../src/http-manager';
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

it('answers.setUniversalLimit sets the universal limit when a UniversalLimit is passed to it', () => {
  const answers = createMockedAnswersHeadless();
  const universalLimit = {
    faq: 5,
    people: 5
  };
  answers.setUniversalLimit(universalLimit);
  expect(answers.state.universal.limit).toEqual(universalLimit);
});

it('answers.setRestrictVerticals sets the restrictVerticals param', async () => {
  const mockSearch = createMockSearch();
  const answers = createMockedAnswersHeadless({
    universalSearch: mockSearch
  });
  answers.setRestrictVerticals(['KM', 'people']);
  await answers.executeUniversalQuery();
  expect(mockSearch.mock.calls[0][0].restrictVerticals).toEqual(['KM', 'people']);
});

it('handle a rejected promise from core', async () => {
  const mockSearch = createMockRejectedSearch();
  const mockCore = { universalSearch: mockSearch };
  const httpManager = new HttpManager();
  const answers = createMockedAnswersHeadless(mockCore, {}, undefined, undefined, httpManager);
  try {
    await answers.executeUniversalQuery();
  } catch (e) {
    expect(e).toEqual('mock error message');
  }
  expect(answers.state.searchStatus.isLoading).toEqual(false);
  expect(httpManager.getLatestResponseId('universalQuery')).toEqual(1);
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
