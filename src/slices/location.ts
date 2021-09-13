import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LatLong, LocationBias } from '@yext/answers-core';
import { LocationState } from '../models/slices/location';

const initialState: LocationState = {};

/**
 * Registers with Redux the slice of {@link State} pertaining to location related attributes
 * like a user specified {@link LatLong} and {@link LocationBias}.
 */
export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setUserLocation: (state, action: PayloadAction<LatLong>) => {
      state.userLocation = action.payload;
    },
    setLocationBias: (state, action: PayloadAction<LocationBias>) => {
      state.locationBias = action.payload;
    }
  }
});

export const { setUserLocation, setLocationBias } = locationSlice.actions;
export default locationSlice.reducer;