import { UniversalSearchRequest, VerticalSearchRequest } from '@yext/answers-core';
import { createMockedStatefulCore } from '../mocks/createMockedStatefulCore';

it('by default no context is sent', async () => {
  const mockSearch = jest.fn((_request: VerticalSearchRequest) => Promise.resolve({}));
  const statefulCore = createMockedStatefulCore({
    verticalSearch: mockSearch
  });
  statefulCore.setQuery('lol');
  statefulCore.setVerticalKey('vertical-key');
  await statefulCore.executeVerticalQuery();
  expect(mockSearch.mock.calls[0][0].context).toEqual(undefined);
});

it('vertical searches send context', async () => {
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
  await statefulCore.executeVerticalQuery();
  expect(mockSearch.mock.calls[0][0].context).toEqual({
    monke: 'cdawg',
    iron: {
      mouse: 'tsun'
    }
  });
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
  await statefulCore.executeUniversalQuery();
  expect(mockSearch.mock.calls[0][0].context).toEqual({
    monke: 'cdawg',
    iron: {
      mouse: 'tsun'
    }
  });
});
