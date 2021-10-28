import ReduxStateManager from '../../src/redux-state-manager';
import { createBaseStore } from '../../src/store';
import HeadlessReducerManager from '../../src/headless-reducer-manager';
import AnswersHeadless from '../../src/answers-headless';
import { expectedInitialState } from '../mocks/expectedInitialState';
import HttpManager from '../../src/http-manager';
import { AnswersCore } from '@yext/answers-core';

it('instantiating a ReduxStateManager creates adjacent state subtrees', () => {
  const store = createBaseStore();
  expect(store.getState()).toEqual({});

  const headlessReducerManager = new HeadlessReducerManager();
  new ReduxStateManager(store, 'aHeadlessId', headlessReducerManager);
  expect(store.getState()).toEqual({
    aHeadlessId: expectedInitialState
  });

  new ReduxStateManager(store, 'anotherId', headlessReducerManager);
  expect(store.getState()).toEqual({
    aHeadlessId: expectedInitialState,
    anotherId: expectedInitialState
  });
});

it('set-state actions are scoped to State subtrees respective to their ReduxStateManager', () => {
  const store = createBaseStore();
  const headlessReducerManager = new HeadlessReducerManager();
  const firstManager = new ReduxStateManager(store, 'first', headlessReducerManager);
  const secondManager = new ReduxStateManager(store, 'second', headlessReducerManager);
  const firstManagerUpdatedState = {
    ...expectedInitialState,
    query: {
      latest: 'the latest',
      query: 'lol'
    }
  };
  const secondManagerUpdatedState = {
    latest: 'second latest',
    query: 'second lol'
  };

  firstManager.dispatchEvent('set-state', firstManagerUpdatedState);
  expect(store.getState()).toEqual({
    first: firstManagerUpdatedState,
    second: expectedInitialState
  });

  secondManager.dispatchEvent('set-state', secondManagerUpdatedState);
  expect(store.getState()).toEqual({
    first: firstManagerUpdatedState,
    second: secondManagerUpdatedState
  });
});

it('dispatching answers actions through AnswersHeadless', () => {
  const store = createBaseStore();
  const headlessReducerManager = new HeadlessReducerManager();
  const stateManager = new ReduxStateManager(store, 'anId', headlessReducerManager);
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
  const headlessReducerManager = new HeadlessReducerManager();
  const stateManager = new ReduxStateManager(store, 'anId', headlessReducerManager);
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

it('addListener can be used to link together different headless instances', () => {
  const store = createBaseStore();
  const headlessReducerManager = new HeadlessReducerManager();
  const firstHeadless = new AnswersHeadless(
    {} as AnswersCore,
    new ReduxStateManager(store, 'first', headlessReducerManager),
    new HttpManager()
  );
  const secondHeadless = new AnswersHeadless(
    {} as AnswersCore,
    new ReduxStateManager(store, 'second', headlessReducerManager),
    new HttpManager()
  );
  firstHeadless.addListener({
    valueAccessor: state => state.sessionTracking,
    callback: sessionTracking => secondHeadless.setState({
      ...secondHeadless.state,
      sessionTracking
    })
  });
  const expectedStartState = {
    ...expectedInitialState,
    sessionTracking: {
      enabled: false
    }
  };
  expect(store.getState()).toEqual({
    first: expectedStartState,
    second: expectedStartState
  });

  const expectedFinalState = {
    ...expectedInitialState,
    sessionTracking: {
      enabled: true
    }
  };
  firstHeadless.setSessionTrackingEnabled(true);
  expect(store.getState()).toEqual({
    first: expectedFinalState,
    second: expectedFinalState
  });
});
