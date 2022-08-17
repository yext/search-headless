"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const answersUtilities = __importStar(require("./answers-utilities"));
const transform_filters_1 = require("./utils/transform-filters");
const searchType_1 = require("./models/utils/searchType");
const vertical_1 = require("./slices/vertical");
const universal_1 = require("./slices/universal");
const filters_1 = require("./slices/filters");
const directanswer_1 = require("./slices/directanswer");
const queryrules_1 = require("./slices/queryrules");
const searchstatus_1 = require("./slices/searchstatus");
/**
 * Provides the functionality for interacting with an Answers Search experience.
 *
 * @public
 */
class AnswersHeadless {
    constructor(core, stateManager, httpManager) {
        this.core = core;
        this.stateManager = stateManager;
        this.httpManager = httpManager;
        /**
         * Common utility functions for manipulating Answers-related data.
         */
        this.utilities = answersUtilities;
    }
    /**
     * Sets {@link QueryState.input} to the specified input.
     *
     * @param input - The input to set
     */
    setQuery(input) {
        this.stateManager.dispatchEvent('query/setInput', input);
    }
    /**
     * Sets {@link QueryState.queryTrigger} to the specified trigger.
     *
     * @param trigger - The query trigger to set
     */
    setQueryTrigger(trigger) {
        this.stateManager.dispatchEvent('query/setTrigger', trigger);
    }
    /**
     * Sets {@link QueryState.querySource} to the specified source.
     *
     * @param source - The query source to set
     */
    setQuerySource(source) {
        this.stateManager.dispatchEvent('query/setSource', source);
    }
    /**
     * Sets up Headless to manage the vertical indicated by the verticalKey.
     *
     * @param verticalKey - The vertical key to set
     */
    setVertical(verticalKey) {
        this._resetSearcherStates();
        this.stateManager.dispatchEvent('vertical/setVerticalKey', verticalKey);
        this.stateManager.dispatchEvent('meta/setSearchType', searchType_1.SearchTypeEnum.Vertical);
    }
    /**
     * Sets up Headless to manage universal searches.
     */
    setUniversal() {
        this._resetSearcherStates();
        this.stateManager.dispatchEvent('vertical/setVerticalKey', undefined);
        this.stateManager.dispatchEvent('meta/setSearchType', searchType_1.SearchTypeEnum.Universal);
    }
    /**
     * Resets the direct answer, filters, query rules, search status, vertical, and universal states
     * to their initial values.
     */
    _resetSearcherStates() {
        this.stateManager.dispatchEvent('set-state', Object.assign(Object.assign({}, this.state), { directAnswer: directanswer_1.initialState, filters: filters_1.initialState, queryRules: queryrules_1.initialState, searchStatus: searchstatus_1.initialState, vertical: vertical_1.initialState, universal: universal_1.initialState }));
    }
    /**
     * Sets {@link VerticalSearchState.limit} to the specified limit.
     *
     * @param limit - The vertical limit to set
     */
    setVerticalLimit(limit) {
        this.stateManager.dispatchEvent('vertical/setLimit', limit);
    }
    /**
     * Sets {@link UniversalSearchState.limit} to the specified limit.
     *
     * @param limit - The universal limit to set
     */
    setUniversalLimit(limit) {
        this.stateManager.dispatchEvent('universal/setLimit', limit);
    }
    /**
     * Sets {@link VerticalSearchState.offset} to the specified offset.
     *
     * @param offset - The vertical offset to set
     */
    setOffset(offset) {
        this.stateManager.dispatchEvent('vertical/setOffset', offset);
    }
    /**
     * Sets {@link FiltersState."static"} to the specified filters.
     *
     * @param filters - The static filters to set
     */
    setStaticFilters(filters) {
        this.stateManager.dispatchEvent('filters/setStatic', filters);
    }
    /**
     * Sets {@link FiltersState.facets} to the specified facets.
     *
     * @param facets - The facets to set
     */
    setFacets(facets) {
        this.stateManager.dispatchEvent('filters/setFacets', facets);
    }
    /**
     * Unselects all {@link FiltersState.facets | facets}.
     */
    resetFacets() {
        this.stateManager.dispatchEvent('filters/resetFacets');
    }
    /**
     * Sets {@link SpellCheckState.enabled} to the specified boolean value.
     *
     * @param enabled - Whether or not spellcheck should be set to enabled
     */
    setSpellCheckEnabled(enabled) {
        this.stateManager.dispatchEvent('spellCheck/setEnabled', enabled);
    }
    /**
     * Sets {@link SessionTrackingState.enabled} to the specified boolean value.
     *
     * @param enabled - Whether or not session tracking should be set to enabled
     */
    setSessionTrackingEnabled(enabled) {
        this.stateManager.dispatchEvent('sessionTracking/setEnabled', enabled);
    }
    /**
     * Sets {@link SessionTrackingState.sessionId} to the specified ID.
     *
     * @param sessionId - The session ID to set
     */
    setSessionId(sessionId) {
        this.stateManager.dispatchEvent('sessionTracking/setSessionId', sessionId);
    }
    /**
     * Sets the alternativeVerticals for {@link VerticalSearchState.noResults} to the
     * specified verticals.
     *
     * @param alternativeVerticals - The alternative verticals to set
     */
    setAlternativeVerticals(alternativeVerticals) {
        this.stateManager.dispatchEvent('vertical/setAlternativeVerticals', alternativeVerticals);
    }
    /**
     * Sets {@link VerticalSearchState.sortBys} to the specified sortBys.
     *
     * @param sortBys - The sortBys to set
     */
    setSortBys(sortBys) {
        this.stateManager.dispatchEvent('vertical/setSortBys', sortBys);
    }
    /**
     * Sets {@link MetaState.context} to the specified context.
     *
     * @param context - The context to set
     */
    setContext(context) {
        this.stateManager.dispatchEvent('meta/setContext', context);
    }
    /**
     * Sets {@link MetaState.referrerPageUrl} to the specified URL.
     *
     * @param referrerPageUrl - The referring page URL to set
     */
    setReferrerPageUrl(referrerPageUrl) {
        this.stateManager.dispatchEvent('meta/setReferrerPageUrl', referrerPageUrl);
    }
    /**
     * Sets {@link LocationState.userLocation} to the specified latitude and
     * longitude.
     *
     * @param latLong - The user location to set
     */
    setUserLocation(latLong) {
        this.stateManager.dispatchEvent('location/setUserLocation', latLong);
    }
    /**
     * Sets the {@link State} to the specified state.
     *
     * @param state - The state to set
     */
    setState(state) {
        this.stateManager.dispatchEvent('set-state', state);
    }
    /**
     * Sets {@link UniversalSearchState.restrictVerticals} to the specified vertical
     * keys.
     *
     * @param restrictVerticals - The new verticals to restrict a universal search
     */
    setRestrictVerticals(restrictVerticals) {
        this.stateManager.dispatchEvent('universal/setRestrictVerticals', restrictVerticals);
    }
    /**
     * Gets the current state of the AnswersHeadless instance.
     */
    get state() {
        return this.stateManager.getState();
    }
    /**
     * Adds a listener for a specific state value of type T.
     *
     * @param listener - The listener to add
     * @returns The function for removing the added listener
     */
    addListener(listener) {
        return this.stateManager.addListener(listener);
    }
    /**
     * Submits a question to the Answers API with the specified request data.
     *
     * @param request - The data for the network request
     * @returns A Promise of a {@link QuestionSubmissionResponse} from the Answers API
     */
    async submitQuestion(request) {
        return this.core.submitQuestion(request);
    }
    /**
     * Performs an Answers search across all verticals with relevant parts of the
     * state used as input to the search. Updates the state with the response data.
     *
     * @returns A Promise of a {@link UniversalSearchResponse} from the Answers API
     */
    async executeUniversalQuery() {
        if (this.state.meta.searchType !== searchType_1.SearchTypeEnum.Universal) {
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
        const request = Object.assign(Object.assign({ query: input || '', querySource,
            queryTrigger,
            skipSpellCheck }, (sessionTrackingEnabled && { sessionId })), { sessionTrackingEnabled,
            limit, location: userLocation, context,
            referrerPageUrl,
            restrictVerticals });
        let response;
        try {
            response = await this.core.universalSearch(request);
        }
        catch (e) {
            const isLatestResponse = this.httpManager.processRequestId('universalQuery', thisRequestId);
            if (isLatestResponse) {
                this.stateManager.dispatchEvent('searchStatus/setIsLoading', false);
            }
            return Promise.reject(e);
        }
        const isLatestResponse = this.httpManager.processRequestId('universalQuery', thisRequestId);
        if (!isLatestResponse) {
            return response;
        }
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
    async executeUniversalAutocomplete() {
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
    async executeVerticalQuery() {
        var _a;
        if (this.state.meta.searchType !== searchType_1.SearchTypeEnum.Vertical) {
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
        const staticFilters = (0, transform_filters_1.transformFiltersToCoreFormat)(this.state.filters.static) || undefined;
        const facets = (_a = this.state.filters) === null || _a === void 0 ? void 0 : _a.facets;
        const limit = this.state.vertical.limit;
        const offset = this.state.vertical.offset;
        const sortBys = this.state.vertical.sortBys;
        const { referrerPageUrl, context } = this.state.meta;
        const { userLocation } = this.state.location;
        const facetsToApply = facets === null || facets === void 0 ? void 0 : facets.map(facet => {
            return {
                fieldId: facet.fieldId,
                options: facet.options.filter(o => o.selected)
            };
        });
        const request = Object.assign(Object.assign({ query: input || '', querySource,
            queryTrigger,
            verticalKey,
            staticFilters, facets: facetsToApply, retrieveFacets: true, limit,
            offset,
            skipSpellCheck }, (sessionTrackingEnabled && { sessionId })), { sessionTrackingEnabled, location: userLocation, sortBys,
            context,
            referrerPageUrl });
        let response;
        try {
            response = await this.core.verticalSearch(request);
        }
        catch (e) {
            const isLatestResponse = this.httpManager.processRequestId('verticalQuery', thisRequestId);
            if (isLatestResponse) {
                this.stateManager.dispatchEvent('searchStatus/setIsLoading', false);
            }
            return Promise.reject(e);
        }
        const isLatestResponse = this.httpManager.processRequestId('verticalQuery', thisRequestId);
        if (!isLatestResponse) {
            return response;
        }
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
    async executeVerticalAutocomplete() {
        if (this.state.meta.searchType !== searchType_1.SearchTypeEnum.Vertical) {
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
    async executeFilterSearch(query, sectioned, fields) {
        if (this.state.meta.searchType !== searchType_1.SearchTypeEnum.Vertical) {
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
    setFacetOption(fieldId, facetOption, selected) {
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
    setFilterOption(filter) {
        this.stateManager.dispatchEvent('filters/setFilterOption', filter);
    }
}
exports.default = AnswersHeadless;
//# sourceMappingURL=answers-headless.js.map