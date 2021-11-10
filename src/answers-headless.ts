import {
  AnswersCore,
  QueryTrigger,
  QuerySource,
  QuestionSubmissionRequest,
  AutocompleteResponse,
  UniversalSearchResponse,
  QuestionSubmissionResponse,
  VerticalResults,
  FacetOption,
  DisplayableFacet,
  SortBy,
  Context,
  LatLong,
  SearchParameterField,
  FilterSearchResponse,
  UniversalLimit,
  VerticalSearchResponse
} from '@yext/answers-core';

import StateListener from './models/state-listener';
import { State } from './models/state';
import StateManager from './models/state-manager';
import { Unsubscribe } from '@reduxjs/toolkit';
import HttpManager from './http-manager';
import answersUtilities from './answers-utilities';
import { SelectableFilter } from './models/utils/selectablefilter';
import { transformFiltersToCoreFormat } from './utils/transform-filters';

export default class AnswersHeadless {
  public readonly utilities = answersUtilities;

  constructor(
    private core: AnswersCore,
    private stateManager: StateManager,
    private httpManager: HttpManager,
  ) {}

  setQuery(query: string): void {
    this.stateManager.dispatchEvent('query/set', query);
  }

  setQueryTrigger(trigger: QueryTrigger): void {
    this.stateManager.dispatchEvent('query/setTrigger', trigger);
  }

  setQuerySource(source: QuerySource): void {
    this.stateManager.dispatchEvent('query/setSource', source);
  }

  setVerticalKey(verticalKey: string): void {
    this.stateManager.dispatchEvent('vertical/setVerticalKey', verticalKey);
  }

  setVerticalLimit(limit: number): void {
    this.stateManager.dispatchEvent('vertical/setLimit', limit);
  }

  setUniversalLimit(limit: UniversalLimit): void {
    this.stateManager.dispatchEvent('universal/setLimit', limit);
  }

  setOffset(offset: number): void {
    this.stateManager.dispatchEvent('vertical/setOffset', offset);
  }

  setStaticFilters(filters: Record<string, SelectableFilter[]> | null): void {
    this.stateManager.dispatchEvent('filters/setStatic', filters);
  }

  setFacets(facets: DisplayableFacet[]): void {
    this.stateManager.dispatchEvent('filters/setFacets', facets);
  }

  resetFacets(): void {
    this.stateManager.dispatchEvent('filters/resetFacets');
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
    const thisRequestId = this.httpManager.updateRequestId('universalQuery');
    this.stateManager.dispatchEvent('universal/setSearchLoading', true);
    const { query, querySource, queryTrigger } = this.state.query;
    const skipSpellCheck = !this.state.spellCheck.enabled;
    const sessionTrackingEnabled = this.state.sessionTracking.enabled;
    const limit = this.state.universal.limit;
    const sessionId = this.state.sessionTracking.sessionId;
    const { referrerPageUrl, context } = this.state.meta;
    const { userLocation } = this.state.location;

    const response = await this.core.universalSearch({
      query: query || '',
      querySource,
      queryTrigger,
      skipSpellCheck,
      sessionId,
      sessionTrackingEnabled,
      limit,
      location: userLocation,
      context,
      referrerPageUrl
    });

    const latestResponseId = this.httpManager.getLatestResponseId('universalQuery');
    if (thisRequestId < latestResponseId) {
      return response;
    }
    this.httpManager.setResponseId('universalQuery', thisRequestId);
    this.stateManager.dispatchEvent('universal/setVerticals', response.verticalResults);
    this.stateManager.dispatchEvent('query/setQueryId', response.queryId);
    this.stateManager.dispatchEvent('query/setLatest', query);
    this.stateManager.dispatchEvent('spellCheck/setResult', response.spellCheck);
    this.stateManager.dispatchEvent('query/setSearchIntents', response.searchIntents || []);
    this.stateManager.dispatchEvent('location/setLocationBias', response.locationBias);
    this.stateManager.dispatchEvent('universal/setSearchLoading', false);
    this.stateManager.dispatchEvent('directAnswer/setResult', response.directAnswer);
    return response;
  }

  async executeUniversalAutoComplete(): Promise<AutocompleteResponse | undefined> {
    const thisRequestId = this.httpManager.updateRequestId('universalAutoComplete');
    const query = this.state.query.query || '';
    const results = await this.core.universalAutocomplete({
      input: query
    });

    const latestResponseId = this.httpManager.getLatestResponseId('universalAutoComplete');
    if (thisRequestId < latestResponseId) {
      return results;
    }
    this.httpManager.setResponseId('universalAutoComplete', thisRequestId);
    this.stateManager.dispatchEvent('universal/setAutoComplete', results);
    this.stateManager.dispatchEvent('query/setSearchIntents', results.inputIntents || []);
    return results;
  }

  async executeVerticalQuery(): Promise<VerticalSearchResponse | undefined> {
    const thisRequestId = this.httpManager.updateRequestId('verticalQuery');
    const verticalKey = this.state.vertical.verticalKey;
    if (!verticalKey) {
      console.error('no verticalKey supplied for vertical search');
      return;
    }
    this.stateManager.dispatchEvent('vertical/setSearchLoading', true);
    const { query, querySource, queryTrigger } = this.state.query;
    const skipSpellCheck = !this.state.spellCheck.enabled;
    const sessionTrackingEnabled = this.state.sessionTracking.enabled;
    const sessionId = this.state.sessionTracking.sessionId;
    const staticFilters = transformFiltersToCoreFormat(this.state.filters.static) || undefined;
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
    const response = await this.core.verticalSearch(request);
    const latestResponseId = this.httpManager.getLatestResponseId('verticalQuery');
    if (thisRequestId < latestResponseId) {
      return response;
    }
    this.httpManager.setResponseId('verticalQuery', thisRequestId);
    this.stateManager.dispatchEvent('query/setQueryId', response.queryId);
    this.stateManager.dispatchEvent('query/setLatest', query);
    this.stateManager.dispatchEvent('filters/setFacets', response.facets);
    this.stateManager.dispatchEvent('spellCheck/setResult', response.spellCheck);
    this.stateManager.dispatchEvent('location/setLocationBias', response.locationBias);
    this.stateManager.dispatchEvent('query/setSearchIntents', response.searchIntents || []);
    this.stateManager.dispatchEvent('location/setLocationBias', response.locationBias);
    this.stateManager.dispatchEvent('directAnswer/setResult', response.directAnswer);
    this.stateManager.dispatchEvent('vertical/setSearchLoading', false);
    this.stateManager.dispatchEvent('vertical/handleSearchResponse', response);
    return response;
  }

  async executeVerticalAutoComplete(): Promise<AutocompleteResponse | undefined> {
    const thisRequestId = this.httpManager.updateRequestId('verticalAutoComplete');
    const query = this.state.query.query || '';
    const verticalKey = this.state.vertical.verticalKey;
    if (!verticalKey) {
      console.error('no verticalKey supplied for vertical autocomplete');
      return;
    }

    const results = await this.core.verticalAutocomplete({
      input: query,
      verticalKey
    });

    const latestResponseId = this.httpManager.getLatestResponseId('verticalAutoComplete');
    if (thisRequestId < latestResponseId) {
      return results;
    }
    this.httpManager.setResponseId('verticalAutoComplete', thisRequestId);
    this.stateManager.dispatchEvent('vertical/setAutoComplete', results);
    this.stateManager.dispatchEvent('query/setSearchIntents', results.inputIntents || []);
    return results;
  }

  async executeFilterSearch(
    query: string,
    sectioned: boolean,
    fields: SearchParameterField[]
  ): Promise<FilterSearchResponse | undefined> {
    const verticalKey = this.state.vertical.verticalKey;
    if (!verticalKey) {
      console.error('no verticalKey supplied for filter search');
      return;
    }
    return this.core.filterSearch({
      input: query,
      verticalKey,
      sessionTrackingEnabled: this.state.sessionTracking.enabled,
      sectioned,
      fields
    });
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

  setFilterOption(seletableFilter: SelectableFilter, filterCollectionId: string): void {
    const { selected, ...filter } = seletableFilter;
    const payload = {
      filterCollectionId,
      filter: filter,
      shouldSelect: selected
    };
    this.stateManager.dispatchEvent('filters/setFilterOption', payload);
  }
}

