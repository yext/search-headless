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
import * as answersUtilities from './answers-utilities';
import { SelectableFilter } from './models/utils/selectableFilter';
import { transformFiltersToCoreFormat } from './utils/transform-filters';
import { SearchTypeEnum } from './models/utils/searchType';
import { initialState as initialVerticalState } from './slices/vertical';
import { initialState as initialUniversalState } from './slices/universal';
import { initialState as initialFiltersState } from './slices/filters';
import { initialState as initialDirectAnswerState } from './slices/directanswer';
import { initialState as initialQueryRulesState } from './slices/queryrules';
import { initialState as initialSearchStatusState } from './slices/searchstatus';

/**
 * Provides the functionality for interacting with an Answers Search experience.
 *
 * @public
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
   * @param input - The input to set
   */
  setQuery(input: string): void {
    this.stateManager.dispatchEvent('query/setInput', input);
  }

  /**
   * Sets {@link QueryState.queryTrigger} to the specified trigger.
   *
   * @param trigger - The query trigger to set
   */
  setQueryTrigger(trigger: QueryTrigger): void {
    this.stateManager.dispatchEvent('query/setTrigger', trigger);
  }

  /**
   * Sets {@link QueryState.querySource} to the specified source.
   *
   * @param source - The query source to set
   */
  setQuerySource(source: QuerySource): void {
    this.stateManager.dispatchEvent('query/setSource', source);
  }

  /**
   * Sets up Headless to manage the vertical indicated by the verticalKey.
   *
   * @param verticalKey - The vertical key to set
   */
  setVertical(verticalKey: string): void {
    this._resetSearcherStates();
    this.stateManager.dispatchEvent('vertical/setVerticalKey', verticalKey);
    this.stateManager.dispatchEvent('meta/setSearchType', SearchTypeEnum.Vertical);
  }

  /**
   * Sets up Headless to manage universal searches.
   */
  setUniversal(): void {
    this._resetSearcherStates();
    this.stateManager.dispatchEvent('vertical/setVerticalKey', undefined);
    this.stateManager.dispatchEvent('meta/setSearchType', SearchTypeEnum.Universal);
  }

  /**
   * Resets the direct answer, filters, query rules, search status, vertical, and universal states
   * to their initial values.
   */
  private _resetSearcherStates() {
    this.stateManager.dispatchEvent('set-state', {
      ...this.state,
      directAnswer: initialDirectAnswerState,
      filters: initialFiltersState,
      queryRules: initialQueryRulesState,
      searchStatus: initialSearchStatusState,
      vertical: initialVerticalState,
      universal: initialUniversalState
    });
  }

  /**
   * Sets {@link VerticalSearchState.limit} to the specified limit.
   *
   * @param limit - The vertical limit to set
   */
  setVerticalLimit(limit: number): void {
    this.stateManager.dispatchEvent('vertical/setLimit', limit);
  }

  /**
   * Sets {@link UniversalSearchState.limit} to the specified limit.
   *
   * @param limit - The universal limit to set
   */
  setUniversalLimit(limit: UniversalLimit): void {
    this.stateManager.dispatchEvent('universal/setLimit', limit);
  }

  /**
   * Sets {@link VerticalSearchState.offset} to the specified offset.
   *
   * @param offset - The vertical offset to set
   */
  setOffset(offset: number): void {
    this.stateManager.dispatchEvent('vertical/setOffset', offset);
  }

  /**
   * Sets {@link FiltersState."static"} to the specified filters.
   *
   * @param filters - The static filters to set
   */
  setStaticFilters(filters: SelectableFilter[]): void {
    this.stateManager.dispatchEvent('filters/setStatic', filters);
  }

  /**
   * Sets {@link FiltersState.facets} to the specified facets.
   *
   * @param facets - The facets to set
   */
  setFacets(facets: DisplayableFacet[]): void {
    this.stateManager.dispatchEvent('filters/setFacets', facets);
  }

  /**
   * Unselects all {@link FiltersState.facets | facets}.
   */
  resetFacets(): void {
    this.stateManager.dispatchEvent('filters/resetFacets');
  }

  /**
   * Sets {@link SpellCheckState.enabled} to the specified boolean value.
   *
   * @param enabled - Whether or not spellcheck should be set to enabled
   */
  setSpellCheckEnabled(enabled: boolean): void {
    this.stateManager.dispatchEvent('spellCheck/setEnabled', enabled);
  }

  /**
   * Sets {@link SessionTrackingState.enabled} to the specified boolean value.
   *
   * @param enabled - Whether or not session tracking should be set to enabled
   */
  setSessionTrackingEnabled(enabled: boolean): void {
    this.stateManager.dispatchEvent('sessionTracking/setEnabled', enabled);
  }

  /**
   * Sets {@link SessionTrackingState.sessionId} to the specified ID.
   *
   * @param sessionId - The session ID to set
   */
  setSessionId(sessionId: string): void {
    this.stateManager.dispatchEvent('sessionTracking/setSessionId', sessionId);
  }

  /**
   * Sets the alternativeVerticals for {@link VerticalSearchState.noResults} to the
   * specified verticals.
   *
   * @param alternativeVerticals - The alternative verticals to set
   */
  setAlternativeVerticals(alternativeVerticals: VerticalResults[]): void {
    this.stateManager.dispatchEvent('vertical/setAlternativeVerticals', alternativeVerticals);
  }

  /**
   * Sets {@link VerticalSearchState.sortBys} to the specified sortBys.
   *
   * @param sortBys - The sortBys to set
   */
  setSortBys(sortBys: SortBy[]): void {
    this.stateManager.dispatchEvent('vertical/setSortBys', sortBys);
  }

  /**
   * Sets {@link MetaState.context} to the specified context.
   *
   * @param context - The context to set
   */
  setContext(context: Context): void {
    this.stateManager.dispatchEvent('meta/setContext', context);
  }

  /**
   * Sets {@link MetaState.referrerPageUrl} to the specified URL.
   *
   * @param referrerPageUrl - The referring page URL to set
   */
  setReferrerPageUrl(referrerPageUrl: string): void {
    this.stateManager.dispatchEvent('meta/setReferrerPageUrl', referrerPageUrl);
  }

  /**
   * Sets {@link LocationState.userLocation} to the specified latitude and
   * longitude.
   *
   * @param latLong - The user location to set
   */
  setUserLocation(latLong: LatLong): void {
    this.stateManager.dispatchEvent('location/setUserLocation', latLong);
  }

  /**
   * Sets the {@link State} to the specified state.
   *
   * @param state - The state to set
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
   * Submits a question to the Answers API with the specified request data.
   *
   * @param request - The data for the network request
   * @returns A Promise of a {@link QuestionSubmissionResponse} from the Answers API
   */
  async submitQuestion(request: QuestionSubmissionRequest): Promise<QuestionSubmissionResponse> {
    return this.core.submitQuestion(request);
  }

  /**
   * Performs an Answers search across all verticals with relevant parts of the
   * state used as input to the search. Updates the state with the response data.
   *
   * @returns A Promise of a {@link UniversalSearchResponse} from the Answers API
   */
  async executeUniversalQuery(): Promise<UniversalSearchResponse | undefined> {
    if(this.state.meta.searchType !== SearchTypeEnum.Universal) {
      console.error('The meta.searchType must be set to \'universal\' for universal search. '
        + 'Set the searchType to universal by calling `setUniversal()`');
      return;
    }
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
    this.stateManager.dispatchEvent('queryRules/setActions', response.queryRulesActionsData || []);
    return response;
  }

  /**
   * Performs an autocomplete request across all verticals using the query input
   * stored in state.
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
   * Perform an Answers search for a single vertical with relevant parts of the
   * state used as input to the search. Updates the state with the response data.
   *
   * @returns A Promise of a {@link VerticalSearchResponse} from the Answers API or
   *          of undefined if there is no verticalKey defined in state
   */
  async executeVerticalQuery(): Promise<VerticalSearchResponse | undefined> {
    if(this.state.meta.searchType !== SearchTypeEnum.Vertical) {
      console.error('The meta.searchType must be set to \'vertical\' for vertical search. '
       + 'Set the searchType to vertical by calling `setVertical()`');
      return;
    }
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
    this.stateManager.dispatchEvent('queryRules/setActions', response.queryRulesActionsData || []);
    return response;
  }

  /**
   * Performs an autocomplete request for a single vertical using the query input
   * and vertical key stored in state.
   *
   * @returns A Promise of an {@link AutocompleteResponse} from the Answers API or
   *          of undefined if there is no verticalKey defined in state
   */
  async executeVerticalAutocomplete(): Promise<AutocompleteResponse | undefined> {
    if(this.state.meta.searchType !== SearchTypeEnum.Vertical) {
      console.error('The meta.searchType must be set to \'vertical\' for vertical autocomplete. '
        + 'Set the searchType to vertical by calling `setVertical()`');
      return;
    }
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
   * Performs a filtersearch request against specified fields within a single
   * vertical using the vertical key stored in state.
   *
   * @param query - The query for which to search
   * @param sectioned - Whether or not the results should be sectioned by field
   * @param fields - The entity fields to search
   * @returns A Promise of a {@link FilterSearchResponse} from the Answers API or
   *          of undefined if there is no verticalKey defined in state
   */
  async executeFilterSearch(
    query: string,
    sectioned: boolean,
    fields: SearchParameterField[]
  ): Promise<FilterSearchResponse | undefined> {
    if(this.state.meta.searchType !== SearchTypeEnum.Vertical) {
      console.error('The meta.searchType must be set to \'vertical\' for filter search. '
      + 'Set the searchType to vertical by calling `setVertical()`');
      return;
    }
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
   * Sets a specified facet option to be selected or unselected.
   *
   * @param fieldId - The fieldId for the facet
   * @param facetOption - The option of the facet to select
   * @param selected - Whether or not the facet option should be selected
   */
  setFacetOption(fieldId: string, facetOption: FacetOption, selected: boolean): void {
    const payload = {
      shouldSelect: selected,
      fieldId,
      facetOption
    };
    this.stateManager.dispatchEvent('filters/setFacetOption', payload);
  }

  /**
   * Sets a static filter option and whether or not it is selected in state.
   *
   * @param filter - The static filter and whether it is selected
   */
  setFilterOption(filter: SelectableFilter): void {
    this.stateManager.dispatchEvent('filters/setFilterOption', filter);
  }
}

