import { VerticalSearchRequest, UniversalSearchRequest, LocationBias, LocationBiasMethod, LatLong } from '@yext/answers-core';
import { createMockedHeadless } from '../mocks/createMockedHeadless';

describe('userLocation', () => {
  it('vertical searches pass userLocation', async () => {
    const userLocation: LatLong = {
      latitude: 2,
      longitude: 1
    };
    const mockSearch = jest.fn((_request: VerticalSearchRequest) => Promise.resolve({}));
    const answers = createMockedHeadless({
      verticalSearch: mockSearch
    });
    answers.setVertical('vertical-key');
    answers.setUserLocation(userLocation);
    await answers.executeVerticalQuery();
    expect(mockSearch.mock.calls[0][0].location).toEqual(userLocation);
  });

  it('universal searches pass userLocation', async () => {
    const userLocation: LatLong = {
      latitude: 2,
      longitude: 1
    };
    const mockSearch = jest.fn((_request: UniversalSearchRequest) => Promise.resolve({}));
    const answers = createMockedHeadless({
      universalSearch: mockSearch
    });
    answers.setUserLocation(userLocation);
    await answers.executeUniversalQuery();
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
    const answers = createMockedHeadless({
      verticalSearch: mockSearch
    });
    answers.setVertical('vertical-key');
    expect(answers.state.location.locationBias).toEqual(undefined);
    await answers.executeVerticalQuery();
    expect(answers.state.location.locationBias).toEqual(locationBias);
  });

  it('universal searches set location bias', async () => {
    const locationBias: LocationBias = {
      latitude: 2,
      longitude: 1,
      displayName: 'yext va',
      method: LocationBiasMethod.Ip
    };
    const mockSearch = jest.fn((_request: UniversalSearchRequest) => Promise.resolve({ locationBias }));
    const answers = createMockedHeadless({
      universalSearch: mockSearch
    });
    expect(answers.state.location.locationBias).toEqual(undefined);
    await answers.executeUniversalQuery();
    expect(answers.state.location.locationBias).toEqual(locationBias);
  });
});