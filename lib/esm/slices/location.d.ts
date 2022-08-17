import { PayloadAction, Slice } from '@reduxjs/toolkit';
import { LatLong, LocationBias } from '@yext/answers-core';
import { LocationState } from '../models/slices/location';
declare const reducers: {
    setUserLocation: (state: any, action: PayloadAction<LatLong>) => void;
    setLocationBias: (state: any, action: PayloadAction<LocationBias>) => void;
};
/**
 * Registers with Redux the slice of {@link State} pertaining to location related
 * attributes like a user specified {@link LatLong} and {@link LocationBias}.
 */
export default function createLocationSlice(prefix: string): Slice<LocationState, typeof reducers>;
export {};
//# sourceMappingURL=location.d.ts.map