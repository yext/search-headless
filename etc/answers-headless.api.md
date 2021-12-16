## API Report File for "@yext/answers-headless"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { Unsubscribe } from '@reduxjs/toolkit';

// @public
export interface AllResultsForVertical {
    facets: DisplayableFacet[];
    results: Result[];
    resultsCount: number;
}

// @public
export type AnswersConfig = AnswersConfigWithApiKey | AnswersConfigWithToken;

// @public
export interface AnswersConfigWithApiKey extends BaseAnswersConfig {
    apiKey: string;
    token?: never;
}

// @public
export interface AnswersConfigWithToken extends BaseAnswersConfig {
    apiKey?: never;
    token: string;
}

// @public
export class AnswersCore {
    filterSearch(request: FilterSearchRequest): Promise<FilterSearchResponse>;
    submitQuestion(request: QuestionSubmissionRequest): Promise<QuestionSubmissionResponse>;
    universalAutocomplete(request: UniversalAutocompleteRequest): Promise<AutocompleteResponse>;
    universalSearch(request: UniversalSearchRequest): Promise<UniversalSearchResponse>;
    verticalAutocomplete(request: VerticalAutocompleteRequest): Promise<AutocompleteResponse>;
    verticalSearch(request: VerticalSearchRequest): Promise<VerticalSearchResponse>;
}

// @public
export class AnswersError extends Error {
    code?: number;
    message: string;
    type?: string;
    /* Excluded from this release type: __constructor */
}

// @public
export class AnswersHeadless {
    // Warning: (ae-forgotten-export) The symbol "HttpManager" needs to be exported by the entry point index.d.ts
    //
    // @internal
    constructor(core: AnswersCore, stateManager: StateManager, httpManager: HttpManager);
    addListener<T>(listener: StateListener<T>): Unsubscribe;
    executeFilterSearch(query: string, sectioned: boolean, fields: SearchParameterField[]): Promise<FilterSearchResponse | undefined>;
    executeUniversalAutocomplete(): Promise<AutocompleteResponse>;
    executeUniversalQuery(): Promise<UniversalSearchResponse | undefined>;
    executeVerticalAutocomplete(): Promise<AutocompleteResponse | undefined>;
    executeVerticalQuery(): Promise<VerticalSearchResponse | undefined>;
    resetFacets(): void;
    setAlternativeVerticals(alternativeVerticals: VerticalResults[]): void;
    setContext(context: Context): void;
    setFacetOption(fieldId: string, facetOption: FacetOption, selected: boolean): void;
    setFacets(facets: DisplayableFacet[]): void;
    setFilterOption(seletableFilter: SelectableFilter): void;
    setOffset(offset: number): void;
    setQuery(input: string): void;
    setQuerySource(source: QuerySource): void;
    setQueryTrigger(trigger: QueryTrigger): void;
    setReferrerPageUrl(referrerPageUrl: string): void;
    setRestrictVerticals(restrictVerticals: string[]): void;
    setSessionId(sessionId: string): void;
    setSessionTrackingEnabled(enabled: boolean): void;
    setSortBys(sortBys: SortBy[]): void;
    setSpellCheckEnabled(enabled: boolean): void;
    setState(state: State): void;
    setStaticFilters(filters: SelectableFilter[]): void;
    setUniversal(): void;
    setUniversalLimit(limit: UniversalLimit): void;
    setUserLocation(latLong: LatLong): void;
    setVertical(verticalKey: string): void;
    setVerticalLimit(limit: number): void;
    get state(): State;
    submitQuestion(request: QuestionSubmissionRequest): Promise<QuestionSubmissionResponse>;
    readonly utilities: {
        searchThroughFacet(facet: DisplayableFacet, searchTerm: string): DisplayableFacet;
    };
}

// @public (undocumented)
export const answersUtilities: {
    searchThroughFacet(facet: DisplayableFacet, searchTerm: string): DisplayableFacet;
};

// @public
export interface AppliedQueryFilter {
    displayKey: string;
    displayValue: string;
    filter: Filter;
}

// @public
export interface AutocompleteResponse {
    inputIntents: SearchIntent[];
    queryId?: string;
    results: AutocompleteResult[];
    uuid: string;
}

// @public
export interface AutocompleteResult {
    filter?: Filter;
    key?: string;
    matchedSubstrings?: {
        length: number;
        offset: number;
    }[];
    relatedItem?: Result;
    value: string;
    verticalKeys?: string[];
}

// @public
export interface BaseAnswersConfig {
    endpoints?: Endpoints;
    experienceKey: string;
    experienceVersion?: 'STAGING' | 'PRODUCTION' | string | number;
    locale: string;
    visitor?: Visitor;
    /* Excluded from this release type: additionalQueryParams */
}

// @public
export interface BoundedRange<T> {
    max?: RangeBoundary<T>;
    min?: RangeBoundary<T>;
}

// @public
export interface CombinedFilter {
    combinator: FilterCombinator;
    filters: (Filter | CombinedFilter)[];
}

// @public
export function combineFilters(filterA: FilterTypes, filterB: FilterTypes, combinator: FilterCombinator): CombinedFilter;

// @public
export type Context = any;

// @public
export function createDateRangeFilter(fieldId: string, range: BoundedRange<Date>): FilterTypes;

// @public
export function createEqualsFilter(fieldId: string, value: string | number | boolean): Filter;

// @public
export function createNearMeFilter(position: NearFilterValue): Filter;

// @public
export function createNumberRangeFilter(fieldId: string, range: BoundedRange<number>): FilterTypes;

// @public
export const DEFAULT_HEADLESS_ID = "main";

// @public
export interface DirectAnswer {
    fieldType: string;
    relatedResult: Result;
    type: DirectAnswerType;
    value?: string;
    verticalKey: string;
}

// @public
export interface DirectAnswerState {
    result?: FeaturedSnippetDirectAnswer | FieldValueDirectAnswer;
}

// @public
export enum DirectAnswerType {
    FeaturedSnippet = "FEATURED_SNIPPET",
    FieldValue = "FIELD_VALUE"
}

// @public
export enum Direction {
    Ascending = "ASC",
    Descending = "DESC"
}

// @public
export interface DisplayableFacet extends Facet {
    displayName: string;
    fieldId: string;
    options: DisplayableFacetOption[];
}

// @public
export interface DisplayableFacetOption extends FacetOption {
    count: number;
    displayName: string;
    matcher: Matcher;
    selected: boolean;
    value: string | number | boolean;
}

// @public
export interface Endpoints {
    // (undocumented)
    filterSearch?: string;
    // (undocumented)
    questionSubmission?: string;
    // (undocumented)
    status?: string;
    // (undocumented)
    universalAutocomplete?: string;
    // (undocumented)
    universalSearch?: string;
    // (undocumented)
    verticalAutocomplete?: string;
    // (undocumented)
    verticalSearch?: string;
}

// @public
export interface Facet {
    fieldId: string;
    options: FacetOption[];
}

// @public
export interface FacetOption {
    matcher: Matcher;
    value: string | number | boolean;
}

// @public
export interface FeaturedSnippetDirectAnswer extends DirectAnswer {
    fieldType: string;
    relatedResult: Result;
    snippet: Snippet;
    type: DirectAnswerType.FeaturedSnippet;
    value?: string;
    verticalKey: string;
}

// @public
export interface FieldValueDirectAnswer extends DirectAnswer {
    entityName: string;
    fieldApiName: string;
    fieldName: string;
    fieldType: string;
    relatedResult: Result;
    type: DirectAnswerType.FieldValue;
    value: string;
    verticalKey: string;
}

// @public
export interface Filter {
    fieldId: string;
    matcher: Matcher;
    value: string | number | boolean | NearFilterValue;
}

// @public
export enum FilterCombinator {
    AND = "$and",
    OR = "$or"
}

// @public
export interface FilterSearchRequest {
    fields: SearchParameterField[];
    input: string;
    sectioned: boolean;
    sessionTrackingEnabled?: boolean;
    verticalKey: string;
}

// @public
export interface FilterSearchResponse {
    businessId?: string;
    queryId?: string;
    sections: {
        label?: string;
        results: AutocompleteResult[];
    }[];
    uuid: string;
}

// @public
export interface FiltersState {
    facets?: DisplayableFacet[];
    static?: SelectableFilter[];
}

// @public
export type FilterTypes = Filter | CombinedFilter;

// @public
export type HeadlessConfig = AnswersConfig & {
    headlessId?: string;
};

// @public
export type HighlightedFields = {
    [fieldId: string]: HighlightedValue | HighlightedValue[] | HighlightedFields | HighlightedFields[];
};

// @public
export interface HighlightedValue {
    matchedSubstrings: {
        length: number;
        offset: number;
    }[];
    value: string;
}

// @public
export interface LatLong {
    latitude: number;
    longitude: number;
}

// @public
export interface LocationBias {
    displayName: string;
    latitude: number;
    longitude: number;
    method: LocationBiasMethod;
}

// @public
export enum LocationBiasMethod {
    Device = "DEVICE",
    Ip = "IP",
    Unknown = "UNKNOWN"
}

// @public
export interface LocationState {
    locationBias?: LocationBias;
    userLocation?: LatLong;
}

// @public
export enum Matcher {
    Equals = "$eq",
    GreaterThan = "$gt",
    GreaterThanOrEqualTo = "$ge",
    LessThan = "$lt",
    LessThanOrEqualTo = "$le",
    Near = "$near",
    NotEquals = "!$eq"
}

// @public
export interface MetaState {
    context?: Context;
    referrerPageUrl?: string;
    // Warning: (ae-forgotten-export) The symbol "SearchType" needs to be exported by the entry point index.d.ts
    searchType: SearchType;
    uuid?: string;
}

// @public
export interface NearFilterValue {
    lat: number;
    lng: number;
    radius: number;
}

// @public
export interface ParentState {
    [headlessId: string]: State;
}

// @public
export function provideAnswersHeadless(config: HeadlessConfig): AnswersHeadless;

// @public
export enum QuerySource {
    Overlay = "OVERLAY",
    Standard = "STANDARD"
}

// @public
export interface QueryState {
    input?: string;
    mostRecentSearch?: string;
    queryId?: string;
    querySource?: QuerySource;
    queryTrigger?: QueryTrigger;
    searchIntents?: SearchIntent[];
}

// @public
export enum QueryTrigger {
    Initialize = "initialize",
    Suggest = "suggest"
}

// @public
export interface QuestionSubmissionRequest {
    email: string;
    entityId: string;
    name: string;
    questionDescription?: string;
    questionText: string;
    sessionTrackingEnabled?: boolean;
}

// @public
export interface QuestionSubmissionResponse {
    uuid: string;
}

// @public
export interface RangeBoundary<T> {
    inclusive: boolean;
    value: T;
}

// @public
export interface Result {
    description?: string;
    distance?: number;
    distanceFromFilter?: number;
    entityType?: string;
    highlightedFields?: HighlightedFields;
    id?: string;
    index?: number;
    link?: string;
    name?: string;
    rawData: Record<string, unknown>;
    source: Source;
}

// @public
export enum SearchIntent {
    NearMe = "NEAR_ME"
}

// @public
export interface SearchParameterField {
    entityType: string;
    fetchEntities: boolean;
    fieldApiName: string;
}

// @public
export interface SearchStatusState {
    isLoading?: boolean;
}

// @public
export interface SelectableFilter extends Filter {
    selected: boolean;
}

// @public
export interface SessionTrackingState {
    enabled?: boolean;
    sessionId?: string;
}

// @public
export interface Snippet {
    matchedSubstrings: {
        offset: number;
        length: number;
    }[];
    value: string;
}

// @public
export interface SortBy {
    direction?: Direction;
    field?: string;
    type: SortType;
}

// @public
export enum SortType {
    EntityDistance = "ENTITY_DISTANCE",
    Field = "FIELD",
    Relevance = "RELEVANCE"
}

// @public
export enum Source {
    Algolia = "ALGOLIA",
    Bing = "BING_CSE",
    Generic = "GENERIC",
    Google = "GOOGLE_CSE",
    KnowledgeManager = "KNOWLEDGE_MANAGER",
    Zendesk = "ZENDESK"
}

// @public
export interface SpellCheck {
    correctedQuery: string;
    originalQuery: string;
    type: SpellCheckType;
}

// @public
export interface SpellCheckState extends Partial<SpellCheck> {
    enabled: boolean;
}

// @public
export enum SpellCheckType {
    AutoCorrect = "AUTOCORRECT",
    Combine = "COMBINE",
    Suggest = "SUGGEST"
}

// @public
export interface State {
    directAnswer: DirectAnswerState;
    filters: FiltersState;
    location: LocationState;
    meta: MetaState;
    query: QueryState;
    searchStatus: SearchStatusState;
    sessionTracking: SessionTrackingState;
    spellCheck: SpellCheckState;
    universal: UniversalSearchState;
    vertical: VerticalSearchState;
}

// @public
export interface StateListener<T> {
    callback(currentValue: T): any;
    valueAccessor(state: State): T;
}

// @public
export interface StateManager {
    addListener<T>(listener: StateListener<T>): Unsubscribe;
    dispatchEvent(type: string, payload?: unknown): void;
    getState(): State;
}

// @public
export interface UniversalAutocompleteRequest {
    input: string;
    sessionTrackingEnabled?: boolean;
}

// @public
export interface UniversalLimit {
    // (undocumented)
    [verticalKey: string]: number;
}

// @public
export interface UniversalSearchRequest {
    context?: Context;
    limit?: UniversalLimit;
    location?: LatLong;
    query: string;
    querySource?: QuerySource | string;
    queryTrigger?: QueryTrigger;
    referrerPageUrl?: string;
    restrictVerticals?: string[];
    sessionId?: string;
    sessionTrackingEnabled?: boolean;
    skipSpellCheck?: boolean;
}

// @public
export interface UniversalSearchResponse {
    directAnswer?: FeaturedSnippetDirectAnswer | FieldValueDirectAnswer;
    locationBias?: LocationBias;
    queryId?: string;
    searchIntents?: SearchIntent[];
    spellCheck?: SpellCheck;
    uuid: string;
    verticalResults: VerticalResults[];
}

// @public
export interface UniversalSearchState {
    limit?: UniversalLimit;
    restrictVerticals?: string[];
    verticals?: VerticalResults[];
}

// @public
export interface VerticalAutocompleteRequest {
    input: string;
    sessionTrackingEnabled?: boolean;
    verticalKey: string;
}

// @public
export interface VerticalResults {
    appliedQueryFilters: AppliedQueryFilter[];
    queryDurationMillis: number;
    results: Result[];
    resultsCount: number;
    source: Source;
    verticalKey: string;
}

// @public
export interface VerticalSearchRequest {
    context?: Context;
    facets?: Facet[];
    limit?: number;
    location?: LatLong;
    locationRadius?: number;
    offset?: number;
    query: string;
    queryId?: string;
    querySource?: QuerySource | string;
    queryTrigger?: QueryTrigger;
    referrerPageUrl?: string;
    retrieveFacets?: boolean;
    sessionId?: string;
    sessionTrackingEnabled?: boolean;
    skipSpellCheck?: boolean;
    sortBys?: SortBy[];
    staticFilters?: CombinedFilter | Filter;
    verticalKey: string;
}

// @public
export interface VerticalSearchResponse {
    allResultsForVertical?: VerticalSearchResponse;
    alternativeVerticals?: VerticalResults[];
    directAnswer?: FeaturedSnippetDirectAnswer | FieldValueDirectAnswer;
    facets?: DisplayableFacet[];
    locationBias?: LocationBias;
    queryId: string;
    searchIntents?: SearchIntent[];
    spellCheck?: SpellCheck;
    uuid: string;
    verticalResults: VerticalResults;
}

// @public
export interface VerticalSearchState {
    appliedQueryFilters?: AppliedQueryFilter[];
    displayName?: string;
    limit?: number;
    noResults?: {
        allResultsForVertical: AllResultsForVertical;
        alternativeVerticals: VerticalResults[];
    };
    offset?: number;
    queryDurationMillis?: number;
    results?: Result[];
    resultsCount?: number;
    sortBys?: SortBy[];
    source?: Source;
    verticalKey?: string;
}

// @public
export interface Visitor {
    id: string;
    idMethod?: string;
}

// (No @packageDocumentation comment for this package)

```