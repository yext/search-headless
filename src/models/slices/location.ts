import { LatLong, LocationBias } from '@yext/answers-core';

export interface LocationState {
  locationBias?: LocationBias,
  userLocation?: LatLong,
}