import { LatLong, LocationBias } from '@yext/answers-core';

/**
 * The state for the user's location.
 */
export interface LocationState {
  /**
   * The geographical location bias used in a search.
   */
  locationBias?: LocationBias,
  /**
   * The latitude and longitude of the user.
   */
  userLocation?: LatLong,
}