import { createSlice } from '@reduxjs/toolkit';
const initialState = {};
const reducers = {
    setUserLocation: (state, action) => {
        state.userLocation = action.payload;
    },
    setLocationBias: (state, action) => {
        state.locationBias = action.payload;
    }
};
/**
 * Registers with Redux the slice of {@link State} pertaining to location related
 * attributes like a user specified {@link LatLong} and {@link LocationBias}.
 */
export default function createLocationSlice(prefix) {
    return createSlice({
        name: prefix + 'location',
        initialState,
        reducers
    });
}
//# sourceMappingURL=location.js.map