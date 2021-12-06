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

  setQuery(input: string): void {
    this.stateManager.dispatchEvent('query/setInput', input);
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

  setStaticFilters(filters: SelectableFilter[]): void {
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

  setRestrictVerticals(restrictVerticals: string[]): void {
    this.stateManager.dispatchEvent('universal/setRestrictVerticals', restrictVerticals);
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
    this.stateManager.dispatchEvent('searchStatus/setIsLoading', true);
    const { input, querySource, queryTrigger } = this.state.query;
    const skipSpellCheck = !this.state.spellCheck.enabled;
    const sessionTrackingEnabled = this.state.sessionTracking.enabled;
    const { limit, restrictVerticals } = this.state.universal;
    const sessionId = this.state.sessionTracking.sessionId;
    const { referrerPageUrl, context } = this.state.meta;
    const { userLocation } = this.state.location;

    const response = await this.core.universalSearch({
      query: input || '',
      querySource,
      queryTrigger,
      skipSpellCheck,
      ...(sessionTrackingEnabled && { sessionId }),
      sessionTrackingEnabled,
      limit,
      location: userLocation,
      context,
      referrerPageUrl,
      restrictVerticals
    });

    const latestResponseId = this.httpManager.getLatestResponseId('universalQuery');
    if (thisRequestId < latestResponseId) {
      return response;
    }
    this.httpManager.setResponseId('universalQuery', thisRequestId);
    this.stateManager.dispatchEvent('universal/setVerticals', response.verticalResults);
    this.stateManager.dispatchEvent('query/setQueryId', response.queryId);
    this.stateManager.dispatchEvent('query/setMostRecentSearch', input);
    this.stateManager.dispatchEvent('spellCheck/setResult', response.spellCheck);
    this.stateManager.dispatchEvent('query/setSearchIntents', response.searchIntents || []);
    this.stateManager.dispatchEvent('location/setLocationBias', response.locationBias);
    this.stateManager.dispatchEvent('searchStatus/setIsLoading', false);
    this.stateManager.dispatchEvent('meta/setUUID', response.uuid);
    this.stateManager.dispatchEvent('directAnswer/setResult', response.directAnswer);
    return response;
  }

  async executeUniversalAutocomplete(): Promise<AutocompleteResponse> {
    const query = this.state.query.input || '';
    return this.core.universalAutocomplete({
      input: query
    });
  }

  async executeVerticalQuery(): Promise<VerticalSearchResponse | undefined> {
    const thisRequestId = this.httpManager.updateRequestId('verticalQuery');
    const verticalKey = this.state.vertical.verticalKey;
    if (!verticalKey) {
      console.error('no verticalKey supplied for vertical search');
      return;
    }
    this.stateManager.dispatchEvent('searchStatus/setIsLoading', true);
    const { input, querySource, queryTrigger } = this.state.query;
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
      query: input || '',
      querySource,
      queryTrigger,
      verticalKey,
      staticFilters,
      facets: facetsToApply,
      retrieveFacets: true,
      limit,
      offset,
      skipSpellCheck,
      ...(sessionTrackingEnabled && { sessionId }),
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
    this.stateManager.dispatchEvent('query/setMostRecentSearch', input);
    this.stateManager.dispatchEvent('filters/setFacets', response.facets);
    this.stateManager.dispatchEvent('spellCheck/setResult', response.spellCheck);
    this.stateManager.dispatchEvent('query/setSearchIntents', response.searchIntents || []);
    this.stateManager.dispatchEvent('location/setLocationBias', response.locationBias);
    this.stateManager.dispatchEvent('directAnswer/setResult', response.directAnswer);
    this.stateManager.dispatchEvent('meta/setUUID', response.uuid);
    this.stateManager.dispatchEvent('searchStatus/setIsLoading', false);
    this.stateManager.dispatchEvent('vertical/handleSearchResponse', response);
    return response;
  }

  async executeVerticalAutocomplete(): Promise<AutocompleteResponse | undefined> {
    const query = this.state.query.input || '';
    const verticalKey = this.state.vertical.verticalKey;
    if (!verticalKey) {
      console.error('no verticalKey supplied for vertical autocomplete');
      return;
    }

    return this.core.verticalAutocomplete({
      input: query,
      verticalKey
    });
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

  setFilterOption(seletableFilter: SelectableFilter): void {
    const { selected, ...filter } = seletableFilter;
    const payload = {
      filter: filter,
      shouldSelect: selected
    };
    this.stateManager.dispatchEvent('filters/setFilterOption', payload);
  }
}

