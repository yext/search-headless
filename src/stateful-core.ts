import {
  AnswersCore,
  QueryTrigger,
  QuerySource,
  QuestionSubmissionRequest,
  Filter,
  CombinedFilter,
  AutocompleteResponse,
  VerticalSearchResponse,
  UniversalSearchResponse,
  QuestionSubmissionResponse,
  VerticalResults,
  FacetOption,
  DisplayableFacet,
  SortBy,
  Context,
  LatLong
} from '@yext/answers-core';

import StateListener from './models/state-listener';
import { State } from './models/state';
import StateManager from './models/state-manager';
import { Unsubscribe } from '@reduxjs/toolkit';
import { isLevenshteinMatch } from './utils/searchable-facets';

export default class StatefulCore {
  constructor(private core: AnswersCore, private stateManager: StateManager) {}

  setQuery(query: string): void {
    this.stateManager.dispatchEvent('query/set', query);
  }

  setQueryTrigger(trigger: QueryTrigger): void {
    this.stateManager.dispatchEvent('query/setTrigger', trigger);
  }

  setQuerySource(source: QuerySource): void {
    this.stateManager.dispatchEvent('query/setSource', source);
  }

  setVerticalKey(key: string): void {
    this.stateManager.dispatchEvent('vertical/setKey', key);
  }

  setLimit(limit: number): void {
    this.stateManager.dispatchEvent('vertical/setLimit', limit);
  }

  setOffset(offset: number): void {
    this.stateManager.dispatchEvent('vertical/setOffset', offset);
  }

  setFilter(filter: Filter | CombinedFilter | null): void {
    this.stateManager.dispatchEvent('filters/setStatic', filter);
  }

  setSpellCheckEnabled(enabled: boolean): void {
    this.stateManager.dispatchEvent('spellCheck/setEnabled', enabled);
  }

  setSessionTrackingEnabled(enabled: boolean): void {
    this.stateManager.dispatchEvent('sessionTracking/setEnabled', enabled);
  }

  setSessionId(sessionId: string): void {
    this.stateManager.dispatchEvent('sessionTracking/setSessionId', sessionId);
  }

  setAlternativeVerticals(alternativeVerticals: VerticalResults[]): void {
    this.stateManager.dispatchEvent('vertical/setAlternativeVerticals', alternativeVerticals);
  }

  setSortBys(sortBys: SortBy[]): void {
    this.stateManager.dispatchEvent('filters/setSortBys', sortBys);
  }

  setContext(context: Context): void {
    this.stateManager.dispatchEvent('meta/setContext', context);
  }

  setReferrerPageUrl(referrerPageUrl: string): void {
    this.stateManager.dispatchEvent('meta/setReferrerPageUrl', referrerPageUrl);
  }

  setUserLocation(latLong: LatLong): void {
    this.stateManager.dispatchEvent('location/setUserLocation', latLong);
  }

  setState(state: State): void {
    this.stateManager.dispatchEvent('set-state', state);
  }

  get state(): State {
    return this.stateManager.getState();
  }

  addListener<T>(listener: StateListener<T>): Unsubscribe {
    return this.stateManager.addListener<T>(listener);
  }

  async submitQuestion(request: QuestionSubmissionRequest): Promise<QuestionSubmissionResponse> {
    return this.core.submitQuestion(request);
  }

  async executeUniversalQuery(): Promise<UniversalSearchResponse | undefined> {
    this.stateManager.dispatchEvent('universal/setSearchLoading', true);
    const { query, querySource, queryTrigger } = this.state.query;
    const skipSpellCheck = !this.state.spellCheck.enabled;
    const sessionTrackingEnabled = this.state.sessionTracking.enabled;
    const sessionId = this.state.sessionTracking.sessionId;
    const { referrerPageUrl, context } = this.state.meta;
    const { userLocation } = this.state.location;

    const results = await this.core.universalSearch({
      query: query || '',
      querySource,
      queryTrigger,
      skipSpellCheck,
      sessionId,
      sessionTrackingEnabled,
      location: userLocation,
      context,
      referrerPageUrl
    });

    this.stateManager.dispatchEvent('universal/setResults', results);
    this.stateManager.dispatchEvent('query/setQueryId', results.queryId);
    this.stateManager.dispatchEvent('query/setLatest', query);
    this.stateManager.dispatchEvent('spellCheck/setResult', results.spellCheck);
    this.stateManager.dispatchEvent('query/setSearchIntents', results.searchIntents || []);
    this.stateManager.dispatchEvent('location/setLocationBias', results.locationBias);
    this.stateManager.dispatchEvent('universal/setSearchLoading', false);
    return results;
  }

  async executeUniversalAutoComplete(): Promise<AutocompleteResponse | undefined> {
    const query = this.state.query.query || '';
    const results = await this.core.universalAutocomplete({
      input: query
    });

    this.stateManager.dispatchEvent('universal/setAutoComplete', results);
    this.stateManager.dispatchEvent('query/setSearchIntents', results.inputIntents || []);
    return results;
  }

  async executeVerticalQuery(): Promise<VerticalSearchResponse | undefined> {
    const verticalKey = this.state.vertical.key;
    if (!verticalKey) {
      console.error('no verticalKey supplied for vertical search');
      return;
    }
    this.stateManager.dispatchEvent('vertical/setSearchLoading', true);
    const { query, querySource, queryTrigger } = this.state.query;
    const skipSpellCheck = !this.state.spellCheck.enabled;
    const sessionTrackingEnabled = this.state.sessionTracking.enabled;
    const sessionId = this.state.sessionTracking.sessionId;
    const staticFilters = this.state.filters.static || undefined;
    const facets = this.state.filters?.facets;
    const limit = this.state.vertical.limit;
    const offset = this.state.vertical.offset;
    const sortBys = this.state.filters?.sortBys;
    const { referrerPageUrl, context } = this.state.meta;
    const { userLocation } = this.state.location;

    const facetsToApply = facets?.map(facet => {
      return {
        fieldId: facet.fieldId,
        options: facet.options.filter(o => o.selected)
      };
    });

    const request = {
      query: query || '',
      querySource,
      queryTrigger,
      verticalKey,
      staticFilters,
      facets: facetsToApply,
      retrieveFacets: true,
      limit,
      offset,
      skipSpellCheck,
      sessionId,
      sessionTrackingEnabled,
      location: userLocation,
      sortBys,
      context,
      referrerPageUrl
    };
    const results = await this.core.verticalSearch(request);
    this.stateManager.dispatchEvent('vertical/setResults', results);
    this.stateManager.dispatchEvent('query/setQueryId', results.queryId);
    this.stateManager.dispatchEvent('query/setLatest', query);
    this.stateManager.dispatchEvent('filters/setFacets', results.facets);
    this.stateManager.dispatchEvent('spellCheck/setResult', results.spellCheck);
    this.stateManager.dispatchEvent('vertical/setAlternativeVerticals', results.alternativeVerticals);
    this.stateManager.dispatchEvent('location/setLocationBias', results.locationBias);
    this.stateManager.dispatchEvent('query/setSearchIntents', results.searchIntents || []);
    this.stateManager.dispatchEvent('location/setLocationBias', results.locationBias);
    this.stateManager.dispatchEvent('vertical/setSearchLoading', false);
    return results;
  }

  async executeVerticalAutoComplete(): Promise<AutocompleteResponse | undefined> {
    const query = this.state.query.query || '';
    const verticalKey = this.state.vertical.key;
    if (!verticalKey) {
      console.error('no verticalKey supplied for vertical autocomplete');
      return;
    }

    const results = await this.core.verticalAutocomplete({
      input: query,
      verticalKey
    });

    this.stateManager.dispatchEvent('vertical/setAutoComplete', results);
    this.stateManager.dispatchEvent('query/setSearchIntents', results.inputIntents || []);
    return results;
  }

  selectFacetOption(fieldId: string, facetOption: FacetOption): void {
    const payload = {
      shouldSelect: true,
      fieldId,
      facetOption
    };
    this.stateManager.dispatchEvent('filters/toggleFacetOption', payload);
  }

  unselectFacetOption(fieldId: string, facetOption: FacetOption): void {
    const payload = {
      shouldSelect: false,
      fieldId,
      facetOption
    };
    this.stateManager.dispatchEvent('filters/toggleFacetOption', payload);
  }

  searchThroughFacet(facet: DisplayableFacet, searchTerm: string): DisplayableFacet {
    return {
      ...facet,
      options: facet.options.filter(o => isLevenshteinMatch(o.displayName, searchTerm))
    };
  }
}

