import ReduxStateManager from '../../src/redux-state-manager';
import { createBaseStore } from '../../src/store';
import ReducerManager from '../../src/reducer-manager';
import AnswersHeadless from '../../src/answers-headless';
import { expectedInitialState } from '../mocks/expectedInitialState';
import HttpManager from '../../src/http-manager';
import { AnswersCore } from '@yext/answers-core';

it('instantiating a ReduxStateManager creates adjacent state subtrees', () => {
  const store = createBaseStore();
  expect(store.getState()).toEqual({});

  const reducerManager = new ReducerManager();
  new ReduxStateManager(store, 'aHeadlessId', reducerManager);
  expect(store.getState()).toEqual({
    aHeadlessId: expectedInitialState
  });

  new ReduxStateManager(store, 'anotherId', reducerManager);
  expect(store.getState()).toEqual({
    aHeadlessId: expectedInitialState,
    anotherId: expectedInitialState
  });
});

it('set-state actions are scoped to State subtrees respective to their ReduxStateManager', () => {
  const store = createBaseStore();
  const reducerManager = new ReducerManager();
  const firstManager = new ReduxStateManager(store, 'first', reducerManager);
  const secondManager = new ReduxStateManager(store, 'second', reducerManager);

  firstManager.dispatchEvent('set-state', {
    ...firstManager.getState(),
    query: {
      latest: 'the latest',
      query: 'lol'
    }
  });
  expect(store.getState()).toEqual({
    first: {
      ...expectedInitialState,
      query: {
        latest: 'the latest',
        query: 'lol'
      }
    },
    second: expectedInitialState
  });

  secondManager.dispatchEvent('set-state', {
    ...secondManager.getState(),
    query: {
      latest: 'second latest',
      query: 'second lol'
    }
  });
  expect(store.getState()).toEqual({
    first: {
      ...expectedInitialState,
      query: {
        latest: 'the latest',
        query: 'lol'
      }
    },
    second: {
      ...expectedInitialState,
      query: {
        latest: 'second latest',
        query: 'second lol'
      }
    }
  });
});

it('dispatching answers actions through AnswersHeadless', () => {
  const store = createBaseStore();
  const reducerManager = new ReducerManager();
  const stateManager = new ReduxStateManager(store, 'anId', reducerManager);
  const headless = new AnswersHeadless({} as AnswersCore, stateManager, new HttpManager());
  headless.setQuery('yo');
  expect(store.getState()).toEqual({
    anId: {
      ...expectedInitialState,
      query: {
        query: 'yo'
      }
    }
  });
});

it('addListener works with multiple headless instances', () => {
  const store = createBaseStore();
  const reducerManager = new ReducerManager();
  const stateManager = new ReduxStateManager(store, 'anId', reducerManager);
  const headless = new AnswersHeadless({} as AnswersCore, stateManager, new HttpManager());
  const callback = jest.fn();
  headless.addListener({
    valueAccessor: state => state.query.query,
    callback
  });
  expect(callback).toHaveBeenCalledTimes(0);
  headless.setQuery('yo');
  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith('yo');

  // Check that the if the state is unchanged the listener is not called extra times
  headless.setQuery('yo');
  expect(callback).toHaveBeenCalledTimes(1);
});
