import { VerticalSearchRequest, UniversalSearchRequest, SearchIntent, AutocompleteResponse } from '@yext/answers-core';
import { createMockedStatefulCore } from '../mocks/createMockedStatefulCore';

it('vertical searches set search intents', async () => {
  const mockSearch = jest.fn((_request: VerticalSearchRequest) => Promise.resolve({
    searchIntents: [SearchIntent.NearMe]
  }));
  const statefulCore = createMockedStatefulCore({
    verticalSearch: mockSearch
  });
  statefulCore.setVerticalKey('vertical-key');
  expect(statefulCore.state.query.searchIntents).toEqual(undefined);
  await statefulCore.executeVerticalQuery();
  expect(statefulCore.state.query.searchIntents).toEqual(['NEAR_ME']);
});

it('universal searches set search intents', async () => {
  const mockSearch = jest.fn((_request: UniversalSearchRequest) => Promise.resolve({
    searchIntents: [SearchIntent.NearMe]
  }));
  const statefulCore = createMockedStatefulCore({
    universalSearch: mockSearch
  });
  expect(statefulCore.state.query.searchIntents).toEqual(undefined);
  await statefulCore.executeUniversalQuery();
  expect(statefulCore.state.query.searchIntents).toEqual(['NEAR_ME']);
});


it('vertical autocomplete sets search intents', async () => {
  const statefulCore = createMockedStatefulCore({
    verticalAutocomplete: jest.fn((_request: AutocompleteResponse) => Promise.resolve({
      inputIntents: [SearchIntent.NearMe]
    }))
  });
  statefulCore.setVerticalKey('vertical-key');
  expect(statefulCore.state.query.searchIntents).toEqual(undefined);
  await statefulCore.executeVerticalAutoComplete();
  expect(statefulCore.state.query.searchIntents).toEqual(['NEAR_ME']);
});

it('universal autocomplete sets search intents', async () => {
  const statefulCore = createMockedStatefulCore({
    universalAutocomplete: jest.fn((_request: AutocompleteResponse) => Promise.resolve({
      inputIntents: [SearchIntent.NearMe]
    }))
  });
  expect(statefulCore.state.query.searchIntents).toEqual(undefined);
  await statefulCore.executeUniversalAutoComplete();
  expect(statefulCore.state.query.searchIntents).toEqual(['NEAR_ME']);
});

