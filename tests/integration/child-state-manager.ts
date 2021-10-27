import { createMockedAnswersHeadless } from '../mocks/createMockedAnswersHeadless';
import ChildStateManager from '../../src/state-managers/child-state-manager';
import { createBaseStore } from '../../src/store';
import ChildReducersManager from '../../src/child-reducers-manager';
import AnswersHeadless from '../../src/answers-headless';
import { expectedInitialState } from '../mocks/expectedInitialState';
import HttpManager from '../../src/http-manager';
import { AnswersCore } from '@yext/answers-core';

it('instantiating a ChildStateManager adds ChildState', () => {
  const store = createBaseStore();
  expect(store.getState().childStates).toEqual(undefined);
  const childReducersManager = new ChildReducersManager();
  new ChildStateManager(store, 'aChildId', childReducersManager);
  expect(store.getState().childStates['aChildId']).toEqual(expectedInitialState);
  new ChildStateManager(store, 'aChildId2', childReducersManager);
  expect(store.getState().childStates['aChildId']).toEqual(expectedInitialState);
  expect(store.getState().childStates['aChildId2']).toEqual(expectedInitialState);
});

it('setState in the child AnswersHeadless will only affect the child', () => {
  const store = createBaseStore();
  createMockedAnswersHeadless({}, {}, store);
  const childReducersManager = new ChildReducersManager();
  const childStateManager =new ChildStateManager(store, 'aChildId', childReducersManager);
  const childHeadless = new AnswersHeadless({} as AnswersCore, childStateManager, new HttpManager());
  childHeadless.setState({
    ...childHeadless.state,
    query: {
      latest: 'the latest',
      query: 'lol'
    }
  });
  expect(store.getState()).toEqual({
    ...expectedInitialState,
    childStates: {
      aChildId: {
        ...expectedInitialState,
        query: {
          latest: 'the latest',
          query: 'lol'
        }
      }
    }
  });
});


it('setState in the main AnswersHeadless CAN affect the child', () => {
  const store = createBaseStore();
  const mainHeadless = createMockedAnswersHeadless({}, {}, store);
  const childReducersManager = new ChildReducersManager();
  new ChildStateManager(store, 'aChildId', childReducersManager);
  mainHeadless.setState({
    ...mainHeadless.state,
    query: {
      latest: 'the latest',
      query: 'lol'
    },
    childStates: undefined
  });
  expect(store.getState()).toEqual({
    ...expectedInitialState,
    query: {
      latest: 'the latest',
      query: 'lol'
    }
  });
});

it('calling actions in the child works as expected', () => {
  const store = createBaseStore();
  createMockedAnswersHeadless({}, {}, store);
  const childReducersManager = new ChildReducersManager();
  const childStateManager =new ChildStateManager(store, 'aChildId', childReducersManager);
  const childHeadless = new AnswersHeadless({} as AnswersCore, childStateManager, new HttpManager());
  childHeadless.setQuery('yo');
  expect(store.getState()).toEqual({
    ...expectedInitialState,
    childStates: {
      aChildId: {
        ...expectedInitialState,
        query: {
          query: 'yo'
        }
      }
    }
  });
});

