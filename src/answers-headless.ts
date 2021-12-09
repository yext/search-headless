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

/**
 * Provides methods for updating the state and for sending requests to the Answers
 * API through {@link AnswersCore}.
 */
export default class AnswersHeadless {
  /**
   * Common utility functions for manipulating Answers-related data.
   */
  public readonly utilities = answersUtilities;

  constructor(
    private core: AnswersCore,
    private stateManager: StateManager,
    private httpManager: HttpManager,
  ) {}

  /**
   * Sets {@link QueryState.input} to the specified input.
   *
   * @param input - The new query input to update to
   */
  setQuery(input: string): void {
    this.stateManager.dispatchEvent('query/setInput', input);
  }

  /**
   * Sets {@link QueryState.queryTrigger} to the specified trigger.
   *
   * @param trigger - The new query trigger to update to
   */
  setQueryTrigger(trigger: QueryTrigger): void {
    this.stateManager.dispatchEvent('query/setTrigger', trigger);
  }

  /**
   * Sets {@link QueryState.querySource} to the specified source.
   *
   * @param source - The new query source to update to
   */
  setQuerySource(source: QuerySource): void {
    this.stateManager.dispatchEvent('query/setSource', source);
  }

  /**
   * Sets {@link VerticalSearchState.verticalKey} to the specified key.
   *
   * @param verticalKey - The new vertical key to update to
   */
  setVerticalKey(verticalKey: string): void {
    this.stateManager.dispatchEvent('vertical/setVerticalKey', verticalKey);
  }

  /**
   * Sets {@link VerticalSearchState.limit} to the specified limit.
   *
   * @param limit - The new vertical limit to update to
   */
  setVerticalLimit(limit: number): void {
    this.stateManager.dispatchEvent('vertical/setLimit', limit);
  }

  /**
   * Sets {@link UniversalSearchState.limit} to the specified limit.
   *
   * @param limit - The new universal limit to update to
   */
  setUniversalLimit(limit: UniversalLimit): void {
    this.stateManager.dispatchEvent('universal/setLimit', limit);
  }

  /**
   * Sets {@link VerticalSearchState.offset} to the specified offset.
   *
   * @param offset - The new vertical offset to update to
   */
  setOffset(offset: number): void {
    this.stateManager.dispatchEvent('vertical/setOffset', offset);
  }

  /**
   * Sets {@link FiltersState."static"} to the specified filters.
   *
   * @param filters - The new static filters to update to
   */
  setStaticFilters(filters: SelectableFilter[]): void {
    this.stateManager.dispatchEvent('filters/setStatic', filters);
  }

  /**
   * Sets {@link FiltersState.facets} to the specified facets.
   *
   * @param facets - The new facets to update to
   */
  setFacets(facets: DisplayableFacet[]): void {
    this.stateManager.dispatchEvent('filters/setFacets', facets);
  }

  /**
   * Resets all {@link FiltersState.facets | facets} to be unselected.
   */
  resetFacets(): void {
    this.stateManager.dispatchEvent('filters/resetFacets');
  }

  /**
   * Sets {@link SpellCheckState.enabled} to the specified boolean value.
   *
   * @param enabled - Whether spellcheck should be set to enabled or not
   */
  setSpellCheckEnabled(enabled: boolean): void {
    this.stateManager.dispatchEvent('spellCheck/setEnabled', enabled);
  }

  /**
   * Sets {@link SessionTrackingState.enabled} to the specified boolean value.
   *
   * @param enabled - Whether session tracking should be set to enabled or not
   */
  setSessionTrackingEnabled(enabled: boolean): void {
    this.stateManager.dispatchEvent('sessionTracking/setEnabled', enabled);
  }

  /**
   * Sets {@link SessionTrackingState.sessionId} to the specified ID.
   *
   * @param sessionId - The new session ID to update to
   */
  setSessionId(sessionId: string): void {
    this.stateManager.dispatchEvent('sessionTracking/setSessionId', sessionId);
  }

  /**
   * Sets {@link VerticalSearchState.alternativeVerticals} to the specified
   * verticals.
   *
   * @param alternativeVerticals - The new alternative verticals to update to
   */
  setAlternativeVerticals(alternativeVerticals: VerticalResults[]): void {
    this.stateManager.dispatchEvent('vertical/setAlternativeVerticals', alternativeVerticals);
  }

  /**
   * Sets {@link VerticalSearchState.sortBys} to the specified sortBys.
   *
   * @param sortBys - The new sortBys to update to
   */
  setSortBys(sortBys: SortBy[]): void {
    this.stateManager.dispatchEvent('vertical/setSortBys', sortBys);
  }

  /**
   * Sets {@link MetaState.context} to the specified context.
   *
   * @param context - The new context to update to
   */
  setContext(context: Context): void {
    this.stateManager.dispatchEvent('meta/setContext', context);
  }

  /**
   * Sets {@link MetaState.referrerPageUrl} to the specified URL.
   *
   * @param referrerPageUrl - The new referring page URL to update to
   */
  setReferrerPageUrl(referrerPageUrl: string): void {
    this.stateManager.dispatchEvent('meta/setReferrerPageUrl', referrerPageUrl);
  }

  /**
   * Sets {@link LocationState.userLocation} to the specified latitude and
   * longitude.
   *
   * @param latLong - The new user location to update to
   */
  setUserLocation(latLong: LatLong): void {
    this.stateManager.dispatchEvent('location/setUserLocation', latLong);
  }

  /**
   * Sets the {@link State} to the specified state.
   *
   * @param state - The new state to update to
   */
  setState(state: State): void {
    this.stateManager.dispatchEvent('set-state', state);
  }

  /**
   * Sets {@link UniversalSearchState.restrictVerticals} to the specified vertical
   * keys.
   *
   * @param restrictVerticals - The new verticals to restrict a universal search
   */
  setRestrictVerticals(restrictVerticals: string[]): void {
    this.stateManager.dispatchEvent('universal/setRestrictVerticals', restrictVerticals);
  }

  /**
   * Gets the current state of the AnswersHeadless instance.
   */
  get state(): State {
    return this.stateManager.getState();
  }

  /**
   * Adds a listener for a specific state value of type T.
   *
   * @param listener - The listener to add
   * @returns The function for removing the added listener
   */
  addListener<T>(listener: StateListener<T>): Unsubscribe {
    return this.stateManager.addListener<T>(listener);
  }

  /**
   * Uses {@link AnswersCore} to submit a question to the Answers API with the
   * specified request data.
   *
   * @param request - The data for the network request
   * @returns A Promise of a {@link QuestionSubmissionResponse} from the Answers API
   */
  async submitQuestion(request: QuestionSubmissionRequest): Promise<QuestionSubmissionResponse> {
    return this.core.submitQuestion(request);
  }

  /**
   * Uses {@link AnswersCore} to perform an Answers search across all verticals with
   * the request data stored in state. Updates the information in state with the
   * corresponding response.
   *
   * @returns A Promise of a {@link UniversalSearchResponse} from the Answers API
   */
  async executeUniversalQuery(): Promise<UniversalSearchResponse> {
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

  /**
   * Uses {@link AnswersCore} to perform an autocomplete request across all
   * verticals with the request data stored in state.
   *
   * @returns A Promise of an {@link AutocompleteResponse} from the Answers API
   */
  async executeUniversalAutocomplete(): Promise<AutocompleteResponse> {
    const query = this.state.query.input || '';
    return this.core.universalAutocomplete({
      input: query
    });
  }

  /**
   * Uses {@link AnswersCore} to perform an Answers search for a single vertical
   * with the request data stored in state. Updates the information in state with
   * the corresponding response.
   *
   * @returns A Promise of a {@link VerticalSearchResponse} from the Answers API or
   *          of undefined if there is no verticalKey defined in state
   */
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
    const sortBys = this.state.vertical.sortBys;
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

  /**
   * Uses {@link AnswersCore} to perform an autocomplete request for a single
   * vertical with the request data stored in state.
   *
   * @returns A Promise of an {@link AutocompleteResponse} from the Answers API or
   *          of undefined if there is no verticalKey defined in state
   */
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

  /**
   * Uses {@link AnswersCore} to perform a filtersearch request against specified
   * fields within a single vertical with the specified parameters and the
   * additional request data stored in state.
   *
   * @param query - The query for which to search
   * @param sectioned - Whether the results should be sectioned by field or not
   * @param fields - The entity fields to search
   * @returns A Promise of a {@link FilterSearchResponse} from the Answers API or
   *          of undefined if there is no verticalKey defined in state
   */
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

  /**
   * Selects a specified facet option.
   *
   * @param fieldId - The fieldId for the facet
   * @param facetOption - The option of the facet to select
   */
  selectFacetOption(fieldId: string, facetOption: FacetOption): void {
    const payload = {
      shouldSelect: true,
      fieldId,
      facetOption
    };
    this.stateManager.dispatchEvent('filters/toggleFacetOption', payload);
  }

  /**
   * Unselects a specified facet option.
   *
   * @param fieldId - The fieldId for the facet
   * @param facetOption - The option of the facet to unselect
   */
  unselectFacetOption(fieldId: string, facetOption: FacetOption): void {
    const payload = {
      shouldSelect: false,
      fieldId,
      facetOption
    };
    this.stateManager.dispatchEvent('filters/toggleFacetOption', payload);
  }

  /**
   * Sets a static filter option and whether it is selected or not in state.
   *
   * @param seletableFilter - The static filter and whether it is selected
   */
  setFilterOption(seletableFilter: SelectableFilter): void {
    const { selected, ...filter } = seletableFilter;
    const payload = {
      filter: filter,
      shouldSelect: selected
    };
    this.stateManager.dispatchEvent('filters/setFilterOption', payload);
  }
}

