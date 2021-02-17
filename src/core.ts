import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { provideCore, AnswersCore, VerticalSearchResponse, Facet } from '@yext/answers-core';
import ReduxThunk from 'redux-thunk';

import coreReducer from './slices/reducer';

export default class StatefulCore {
  private core: AnswersCore;
  private store: any;

  constructor() {
    this.core = provideCore(
      { apiKey: 'df4b24f4075800e5e9705090c54c6c13', experienceKey: 'rosetest', locale: 'en' });
    this.store = configureStore({ 
      reducer: coreReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ReduxThunk)
    });
  }

  get query(): string {
    return this.store.getState().query.query;
  }

  setQuery(query: string) {
    this.store.dispatch({ type: 'query/set', payload: { query }});
  }

  get verticalKey(): string {
    return this.store.getState().vertical.verticalKey;
  }

  setVerticalKey(key: string) {
    this.store.dispatch({ type: 'vertical/setKey', payload: { verticalKey: key }});
  }

  get verticalResults(): VerticalSearchResponse {
    return this.store.getState().vertical.verticalResults;
  }

  get facets(): Facet[] {
    return this.store.getState().vertical.facets;
  }

  async executeVerticalQuery() {
    const queryThunk = async (dispatch, getState) => {
      const results = await this.core.verticalSearch(
          { query: this.query, verticalKey: this.verticalKey, retrieveFacets: true });
      dispatch({ type: 'vertical/setResults', payload: { results }});
    }
    await this.store.dispatch(queryThunk);
  }
}

