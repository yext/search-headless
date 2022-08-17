"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A Redux-backed implementation of the {@link StateManager} interface. Redux is used to
 * manage the state, dispatch events, and register state listeners.
 */
class ReduxStateManager {
    constructor(store, headlessId, headlessReducerManager) {
        this.store = store;
        this.headlessId = headlessId;
        headlessReducerManager.addAnswersReducer(this.headlessId);
        store.replaceReducer(headlessReducerManager.getParentReducer());
    }
    getState() {
        const state = this.store.getState();
        return state[this.headlessId];
    }
    dispatchEvent(type, payload) {
        const answersActionType = type === 'set-state' ? 'set-state' : this.headlessId + '/' + type;
        this.store.dispatch({
            type: answersActionType,
            payload,
            headlessId: this.headlessId
        });
    }
    addListener(listener) {
        let previousValue = listener.valueAccessor(this.getState());
        return this.store.subscribe(() => {
            const currentValue = listener.valueAccessor(this.getState());
            if (currentValue !== previousValue) {
                previousValue = currentValue;
                listener.callback(currentValue);
            }
        });
    }
}
exports.default = ReduxStateManager;
//# sourceMappingURL=redux-state-manager.js.map