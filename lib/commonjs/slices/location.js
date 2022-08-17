"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
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
function createLocationSlice(prefix) {
    return (0, toolkit_1.createSlice)({
        name: prefix + 'location',
        initialState,
        reducers
    });
}
exports.default = createLocationSlice;
//# sourceMappingURL=location.js.map