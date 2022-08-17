"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBaseStore = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
/**
 * This reducer will be replaced by initializations of {@link ReduxStateManager}.
 * It is necessary to still have this reducer, though, otherwise Redux's `@@init`
 * event will not function properly.
 */
const initialReducer = (state) => {
    return state || {};
};
function createBaseStore() {
    const store = (0, toolkit_1.configureStore)({
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
        reducer: initialReducer,
        devTools: process.env.NODE_ENV === 'production' ? false : {
            name: 'AnswersHeadless'
        }
    });
    return store;
}
exports.createBaseStore = createBaseStore;
//# sourceMappingURL=store.js.map