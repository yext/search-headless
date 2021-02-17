import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { provideCore, AnswersCore, VerticalSearchResponse, Facet, Filter, QueryTrigger, QuerySource, UniversalSearchResponse } from '@yext/answers-core';
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

  setQueryTrigger(trigger: QueryTrigger) {
    this.store.dispatch({ type: 'query/setTrigger', payload: { trigger }});
  }

  get queryTrigger(): QueryTrigger {
    return this.store.getState().querytrigger;
  }

  setQuerySource(source: QuerySource) {
    this.store.dispatch({ type: 'query/setSource', payload: { source }});
  }

  get querySource(): QuerySource {
    return this.store.getState().querySource;
  }

  get verticalKey(): string {
    return this.store.getState().vertical.verticalKey;
  }

  setVerticalKey(key: string) {
    this.store.dispatch({ type: 'vertical/setKey', payload: { verticalKey: key }});
  }

  setFilters(filters: Filter[]) {
    this.store.dispatch({ type: 'static-filters/set', payload: { filters }});
  }

  get verticalResults(): VerticalSearchResponse {
    return this.store.getState().vertical.verticalResults;
  }

  get universalResults(): UniversalSearchResponse {
    return this.store.getState().universal.universalResults;
  }

  get facets(): Facet[] {
    return this.store.getState().vertical.facets;
  }

  async executeUniversalQuery() {
    const queryThunk = async (dispatch, getState) => {
      const results = await this.core.universalSearch({ 
        query: this.query,
        querySource: this.querySource,
        queryTrigger: this.queryTrigger,
      });
      dispatch({ type: 'universal/setResults', payload: { results }});
    }
    await this.store.dispatch(queryThunk);
  }

  async executeVerticalQuery() {
    const queryThunk = async (dispatch, getState) => {
      const results = await this.core.verticalSearch({ 
        query: this.query,
        querySource: this.querySource,
        queryTrigger: this.queryTrigger,
        verticalKey: this.verticalKey,
        retrieveFacets: true
      });
      dispatch({ type: 'vertical/setResults', payload: { results }});
    }
    await this.store.dispatch(queryThunk);
  }
}

