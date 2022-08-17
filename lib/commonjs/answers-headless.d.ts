import { AnswersCore, QueryTrigger, QuerySource, QuestionSubmissionRequest, AutocompleteResponse, UniversalSearchResponse, QuestionSubmissionResponse, VerticalResults, FacetOption, DisplayableFacet, SortBy, Context, LatLong, SearchParameterField, FilterSearchResponse, UniversalLimit, VerticalSearchResponse } from '@yext/answers-core';
import StateListener from './models/state-listener';
import { State } from './models/state';
import StateManager from './models/state-manager';
import { Unsubscribe } from '@reduxjs/toolkit';
import HttpManager from './http-manager';
import * as answersUtilities from './answers-utilities';
import { SelectableFilter } from './models/utils/selectableFilter';
/**
 * Provides the functionality for interacting with an Answers Search experience.
 *
 * @public
 */
export default class AnswersHeadless {
    private core;
    private stateManager;
    private httpManager;
    /**
     * Common utility functions for manipulating Answers-related data.
     */
    readonly utilities: typeof answersUtilities;
    constructor(core: AnswersCore, stateManager: StateManager, httpManager: HttpManager);
    /**
     * Sets {@link QueryState.input} to the specified input.
     *
     * @param input - The input to set
     */
    setQuery(input: string): void;
    /**
     * Sets {@link QueryState.queryTrigger} to the specified trigger.
     *
     * @param trigger - The query trigger to set
     */
    setQueryTrigger(trigger: QueryTrigger): void;
    /**
     * Sets {@link QueryState.querySource} to the specified source.
     *
     * @param source - The query source to set
     */
    setQuerySource(source: QuerySource): void;
    /**
     * Sets up Headless to manage the vertical indicated by the verticalKey.
     *
     * @param verticalKey - The vertical key to set
     */
    setVertical(verticalKey: string): void;
    /**
     * Sets up Headless to manage universal searches.
     */
    setUniversal(): void;
    /**
     * Resets the direct answer, filters, query rules, search status, vertical, and universal states
     * to their initial values.
     */
    private _resetSearcherStates;
    /**
     * Sets {@link VerticalSearchState.limit} to the specified limit.
     *
     * @param limit - The vertical limit to set
     */
    setVerticalLimit(limit: number): void;
    /**
     * Sets {@link UniversalSearchState.limit} to the specified limit.
     *
     * @param limit - The universal limit to set
     */
    setUniversalLimit(limit: UniversalLimit): void;
    /**
     * Sets {@link VerticalSearchState.offset} to the specified offset.
     *
     * @param offset - The vertical offset to set
     */
    setOffset(offset: number): void;
    /**
     * Sets {@link FiltersState."static"} to the specified filters.
     *
     * @param filters - The static filters to set
     */
    setStaticFilters(filters: SelectableFilter[]): void;
    /**
     * Sets {@link FiltersState.facets} to the specified facets.
     *
     * @param facets - The facets to set
     */
    setFacets(facets: DisplayableFacet[]): void;
    /**
     * Unselects all {@link FiltersState.facets | facets}.
     */
    resetFacets(): void;
    /**
     * Sets {@link SpellCheckState.enabled} to the specified boolean value.
     *
     * @param enabled - Whether or not spellcheck should be set to enabled
     */
    setSpellCheckEnabled(enabled: boolean): void;
    /**
     * Sets {@link SessionTrackingState.enabled} to the specified boolean value.
     *
     * @param enabled - Whether or not session tracking should be set to enabled
     */
    setSessionTrackingEnabled(enabled: boolean): void;
    /**
     * Sets {@link SessionTrackingState.sessionId} to the specified ID.
     *
     * @param sessionId - The session ID to set
     */
    setSessionId(sessionId: string): void;
    /**
     * Sets the alternativeVerticals for {@link VerticalSearchState.noResults} to the
     * specified verticals.
     *
     * @param alternativeVerticals - The alternative verticals to set
     */
    setAlternativeVerticals(alternativeVerticals: VerticalResults[]): void;
    /**
     * Sets {@link VerticalSearchState.sortBys} to the specified sortBys.
     *
     * @param sortBys - The sortBys to set
     */
    setSortBys(sortBys: SortBy[]): void;
    /**
     * Sets {@link MetaState.context} to the specified context.
     *
     * @param context - The context to set
     */
    setContext(context: Context): void;
    /**
     * Sets {@link MetaState.referrerPageUrl} to the specified URL.
     *
     * @param referrerPageUrl - The referring page URL to set
     */
    setReferrerPageUrl(referrerPageUrl: string): void;
    /**
     * Sets {@link LocationState.userLocation} to the specified latitude and
     * longitude.
     *
     * @param latLong - The user location to set
     */
    setUserLocation(latLong: LatLong): void;
    /**
     * Sets the {@link State} to the specified state.
     *
     * @param state - The state to set
     */
    setState(state: State): void;
    /**
     * Sets {@link UniversalSearchState.restrictVerticals} to the specified vertical
     * keys.
     *
     * @param restrictVerticals - The new verticals to restrict a universal search
     */
    setRestrictVerticals(restrictVerticals: string[]): void;
    /**
     * Gets the current state of the AnswersHeadless instance.
     */
    get state(): State;
    /**
     * Adds a listener for a specific state value of type T.
     *
     * @param listener - The listener to add
     * @returns The function for removing the added listener
     */
    addListener<T>(listener: StateListener<T>): Unsubscribe;
    /**
     * Submits a question to the Answers API with the specified request data.
     *
     * @param request - The data for the network request
     * @returns A Promise of a {@link QuestionSubmissionResponse} from the Answers API
     */
    submitQuestion(request: QuestionSubmissionRequest): Promise<QuestionSubmissionResponse>;
    /**
     * Performs an Answers search across all verticals with relevant parts of the
     * state used as input to the search. Updates the state with the response data.
     *
     * @returns A Promise of a {@link UniversalSearchResponse} from the Answers API
     */
    executeUniversalQuery(): Promise<UniversalSearchResponse | undefined>;
    /**
     * Performs an autocomplete request across all verticals using the query input
     * stored in state.
     *
     * @returns A Promise of an {@link AutocompleteResponse} from the Answers API
     */
    executeUniversalAutocomplete(): Promise<AutocompleteResponse>;
    /**
     * Perform an Answers search for a single vertical with relevant parts of the
     * state used as input to the search. Updates the state with the response data.
     *
     * @returns A Promise of a {@link VerticalSearchResponse} from the Answers API or
     *          of undefined if there is no verticalKey defined in state
     */
    executeVerticalQuery(): Promise<VerticalSearchResponse | undefined>;
    /**
     * Performs an autocomplete request for a single vertical using the query input
     * and vertical key stored in state.
     *
     * @returns A Promise of an {@link AutocompleteResponse} from the Answers API or
     *          of undefined if there is no verticalKey defined in state
     */
    executeVerticalAutocomplete(): Promise<AutocompleteResponse | undefined>;
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
    executeFilterSearch(query: string, sectioned: boolean, fields: SearchParameterField[]): Promise<FilterSearchResponse | undefined>;
    /**
     * Sets a specified facet option to be selected or unselected.
     *
     * @param fieldId - The fieldId for the facet
     * @param facetOption - The option of the facet to select
     * @param selected - Whether or not the facet option should be selected
     */
    setFacetOption(fieldId: string, facetOption: FacetOption, selected: boolean): void;
    /**
     * Sets a static filter option and whether or not it is selected in state.
     *
     * @param filter - The static filter and whether it is selected
     */
    setFilterOption(filter: SelectableFilter): void;
}
//# sourceMappingURL=answers-headless.d.ts.map