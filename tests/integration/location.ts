import { VerticalSearchRequest, UniversalSearchRequest, SearchIntent, AutocompleteResponse, LocationBias, LocationBiasMethod } from '@yext/answers-core';
import { createMockedStatefulCore } from '../mocks/createMockedStatefulCore';

it('vertical searches set location bias', async () => {
  const locationBias: LocationBias = {
    latitude: 2,
    longitude: 1,
    displayName: 'yext va',
    method: LocationBiasMethod.Ip
  };
  const mockSearch = jest.fn((_request: VerticalSearchRequest) => Promise.resolve({ locationBias }));
  const statefulCore = createMockedStatefulCore({
    verticalSearch: mockSearch
  });
  statefulCore.setVerticalKey('vertical-key');
  expect(statefulCore.state.location.locationBias).toEqual(undefined);
  await statefulCore.executeVerticalQuery();
  expect(statefulCore.state.location.locationBias).toEqual(locationBias);
});

it('universal searches set location bias', async () => {
  const locationBias: LocationBias = {
    latitude: 2,
    longitude: 1,
    displayName: 'yext va',
    method: LocationBiasMethod.Ip
  };
  const mockSearch = jest.fn((_request: UniversalSearchRequest) => Promise.resolve({ locationBias }));
  const statefulCore = createMockedStatefulCore({
    universalSearch: mockSearch
  });
  expect(statefulCore.state.location.locationBias).toEqual(undefined);
  await statefulCore.executeUniversalQuery();
  expect(statefulCore.state.location.locationBias).toEqual(locationBias);
});

