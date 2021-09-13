import { VerticalSearchRequest, UniversalSearchRequest, LocationBias, LocationBiasMethod, LatLong } from '@yext/answers-core';
import { createMockedStatefulCore } from '../mocks/createMockedStatefulCore';

describe('userLocation', () => {
  it('vertical searches pass userLocation', async () => {
    const userLocation: LatLong = {
      latitude: 2,
      longitude: 1
    };
    const mockSearch = jest.fn((_request: VerticalSearchRequest) => Promise.resolve({}));
    const statefulCore = createMockedStatefulCore({
      verticalSearch: mockSearch
    });
    statefulCore.setVerticalKey('vertical-key');
    statefulCore.setUserLocation(userLocation);
    await statefulCore.executeVerticalQuery();
    expect(mockSearch.mock.calls[0][0].location).toEqual(userLocation);
  });

  it('universal searches pass userLocation', async () => {
    const userLocation: LatLong = {
      latitude: 2,
      longitude: 1
    };
    const mockSearch = jest.fn((_request: UniversalSearchRequest) => Promise.resolve({}));
    const statefulCore = createMockedStatefulCore({
      universalSearch: mockSearch
    });
    statefulCore.setUserLocation(userLocation);
    await statefulCore.executeUniversalQuery();
    expect(mockSearch.mock.calls[0][0].location).toEqual(userLocation);
  });
});

describe('locationBias', () => {
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
});