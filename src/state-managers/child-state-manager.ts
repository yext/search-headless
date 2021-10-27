import { EnhancedStore, Unsubscribe, combineReducers } from '@reduxjs/toolkit';
import StateListener from '../models/state-listener';
import StateManager from '../models/state-manager';
import { ChildState, State } from '../models/state';
import { baseReducers, createAnswersReducers } from '../store';
import ChildReducersManager from '../child-reducers-manager';

/**
 * A {@link StateManager} scoped to a section of childState in the {@link ParentState},
 * which is defined by the childId passed into its constructor.
 */
export default class ChildStateManager implements StateManager {
  private actionPrefix: string;
  constructor(
    private store: EnhancedStore,
    private childId: string,
    childReducersManager: ChildReducersManager
  ) {
    this.actionPrefix = childId + '/';

    // Create new answers reducers for this child's chunk of state, and inject them into the store
    const reducer = combineReducers(createAnswersReducers(this.actionPrefix));
    childReducersManager.setReducer(this.childId, reducer);
    const coreReducer = combineReducers({
      ...baseReducers,
      childStates: combineReducers({
        ...childReducersManager.getReducers()
      })
    });

    // Special handling is required for set-state, in order to only update the child's store
    // if set-state is called from a child AnswersHeadless, but to still update the entire state
    // if called from the main AnswersHeadless.
    store.replaceReducer((state, action) => {
      if (action.originalType === 'set-state' && action.childId) {
        return {
          ...state,
          childStates: {
            ...state.childStates,
            [this.childId]: action.payload
          }
        };
      } else if (action.type === 'set-state') {
        return action.payload;
      } else {
        return coreReducer(state, action);
      }
    });
  }

  getState(): ChildState {
    const state = this.store.getState();
    return state.childStates[this.childId];
  }

  /**
   * Dispatches an event, but with a transformed type in order to trigger the child's reducers and not
   * the main {@link ReduxStateManager}'s reducers.
   *
   * originalType and childId are needed to handle the set-state action properly.
   */
  dispatchEvent(type: string, payload?: unknown): void {
    const prefixedActionType = this.actionPrefix + type;
    this.store.dispatch({
      type: prefixedActionType,
      originalType: type,
      payload,
      childId: this.childId
    });
  }

  addListener<T>(listener: StateListener<T>): Unsubscribe {
    let previousValue = listener.valueAccessor(this.getState());
    return this.store.subscribe(() => {
      const currentValue: T = listener.valueAccessor(this.getState());
      if (currentValue !== previousValue) {
        listener.callback(currentValue);
        previousValue = currentValue;
      }
    });
  }
}