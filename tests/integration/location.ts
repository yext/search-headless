import { VerticalSearchRequest, UniversalSearchRequest, LocationBias, LocationBiasMethod, LatLong } from '@yext/search-core';
import { createMockedSearchHeadless } from '../mocks/createMockedSearchHeadless';

describe('userLocation', () => {
  it('vertical searches pass userLocation', async () => {
    const userLocation: LatLong = {
      latitude: 2,
      longitude: 1
    };
    const mockSearch = jest.fn((_request: VerticalSearchRequest) => Promise.resolve({}));
    const search = createMockedSearchHeadless({
      verticalSearch: mockSearch
    });
    search.setVertical('vertical-key');
    search.setUserLocation(userLocation);
    await search.executeVerticalQuery();
    expect(mockSearch.mock.calls[0][0].location).toEqual(userLocation);
  });

  it('universal searches pass userLocation', async () => {
    const userLocation: LatLong = {
      latitude: 2,
      longitude: 1
    };
    const mockSearch = jest.fn((_request: UniversalSearchRequest) => Promise.resolve({}));
    const search = createMockedSearchHeadless({
      universalSearch: mockSearch
    });
    search.setUserLocation(userLocation);
    await search.executeUniversalQuery();
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
    const search = createMockedSearchHeadless({
      verticalSearch: mockSearch
    });
    search.setVertical('vertical-key');
    expect(search.state.location.locationBias).toEqual(undefined);
    await search.executeVerticalQuery();
    expect(search.state.location.locationBias).toEqual(locationBias);
  });

  it('universal searches set location bias', async () => {
    const locationBias: LocationBias = {
      latitude: 2,
      longitude: 1,
      displayName: 'yext va',
      method: LocationBiasMethod.Ip
    };
    const mockSearch = jest.fn((_request: UniversalSearchRequest) => Promise.resolve({ locationBias }));
    const search = createMockedSearchHeadless({
      universalSearch: mockSearch
    });
    expect(search.state.location.locationBias).toEqual(undefined);
    await search.executeUniversalQuery();
    expect(search.state.location.locationBias).toEqual(locationBias);
  });
});