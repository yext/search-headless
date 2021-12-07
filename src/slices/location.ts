import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { LatLong, LocationBias } from '@yext/answers-core';
import { LocationState } from '../models/slices/location';

const initialState: LocationState = {};

const reducers = {
  setUserLocation: (state, action: PayloadAction<LatLong>) => {
    state.userLocation = action.payload;
  },
  setLocationBias: (state, action: PayloadAction<LocationBias>) => {
    state.locationBias = action.payload;
  }
};

/**
 * Registers with Redux the slice of {@link State} pertaining to location related
 * attributes like a user specified {@link LatLong} and {@link LocationBias}.
 *
 * @param prefix - The prefix for the AnswersHeadless instance
 * @returns The {@link Slice} for the user location
 */
export default function createLocationSlice(prefix: string): Slice<LocationState, typeof reducers> {
  return createSlice({
    name: prefix + 'location',
    initialState,
    reducers
  });
}
