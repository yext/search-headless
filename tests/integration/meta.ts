import { UniversalSearchRequest, VerticalSearchRequest } from '@yext/answers-core';
import { createMockedAnswersHeadless } from '../mocks/createMockedAnswersHeadless';

it('by default no meta attributes are sent', async () => {
  const mockSearch = jest.fn((_request: VerticalSearchRequest) => Promise.resolve({}));
  const answers = createMockedAnswersHeadless({
    verticalSearch: mockSearch
  });
  answers.setQuery('lol');
  answers.setVertical('vertical-key');
  await answers.executeVerticalQuery();
  expect(mockSearch.mock.calls[0][0].context).toEqual(undefined);
  expect(mockSearch.mock.calls[0][0].referrerPageUrl).toEqual(undefined);
});

it('vertical searches send meta data', async () => {
  const mockSearch = jest.fn((_request: VerticalSearchRequest) => Promise.resolve({}));
  const answers = createMockedAnswersHeadless({
    verticalSearch: mockSearch
  });
  answers.setQuery('lol');
  answers.setVertical('vertical-key');
  answers.setContext({
    monke: 'cdawg',
    iron: {
      mouse: 'tsun'
    }
  });
  answers.setReferrerPageUrl('monkey');
  await answers.executeVerticalQuery();
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
  const answers = createMockedAnswersHeadless({
    universalSearch: mockSearch
  });
  answers.setQuery('lol');
  answers.setUniversal();
  answers.setContext({
    monke: 'cdawg',
    iron: {
      mouse: 'tsun'
    }
  });
  answers.setReferrerPageUrl('monkey');
  await answers.executeUniversalQuery();
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
  const answers = createMockedAnswersHeadless({
    universalSearch: mockSearch
  });
  answers.setUniversal();
  answers.setQuery('lol');
  await answers.executeUniversalQuery();
  expect(answers.state.meta.uuid).toEqual(123);
});

it('vertical searches update the uuid', async () => {
  const mockSearch = jest.fn((_request: UniversalSearchRequest) => Promise.resolve({
    uuid: 456
  }));
  const answers = createMockedAnswersHeadless({
    verticalSearch: mockSearch
  });
  answers.setQuery('lol');
  answers.setVertical('test');
  await answers.executeVerticalQuery();
  expect(answers.state.meta.uuid).toEqual(456);
});