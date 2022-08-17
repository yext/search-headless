import { configureStore } from '@reduxjs/toolkit';
/**
 * This reducer will be replaced by initializations of {@link ReduxStateManager}.
 * It is necessary to still have this reducer, though, otherwise Redux's `@@init`
 * event will not function properly.
 */
const initialReducer = (state) => {
    return state || {};
};
export function createBaseStore() {
    const store = configureStore({
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
        reducer: initialReducer,
        devTools: process.env.NODE_ENV === 'production' ? false : {
            name: 'AnswersHeadless'
        }
    });
    return store;
}
//# sourceMappingURL=store.js.map