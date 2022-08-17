import { createSlice } from '@reduxjs/toolkit';
export const initialState = { actions: [] };
const reducers = {
    setActions: (state, action) => {
        state.actions = action.payload;
    },
};
/**
 * Registers with Redux the slice of {@link State} pertaining to the triggered
 * query rules.
 */
export default function createQueryRulesSlice(prefix) {
    return createSlice({
        name: prefix + 'queryRules',
        initialState,
        reducers
    });
}
//# sourceMappingURL=queryrules.js.map