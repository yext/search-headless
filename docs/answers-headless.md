<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/answers-headless](./answers-headless.md)

## answers-headless package

## Classes

|  Class | Description |
|  --- | --- |
|  [AnswersCore](./answers-headless.answerscore.md) | Provides methods for executing searches, submitting questions, and performing autocompletes. |
|  [AnswersError](./answers-headless.answerserror.md) | Represents an error |
|  [AnswersHeadless](./answers-headless.answersheadless.md) | Provides the functionality for interacting with an Answers Search experience. |

## Enumerations

|  Enumeration | Description |
|  --- | --- |
|  [DirectAnswerType](./answers-headless.directanswertype.md) | Represents the type of direct answer. |
|  [Direction](./answers-headless.direction.md) | The direction of a sort. |
|  [FilterCombinator](./answers-headless.filtercombinator.md) | Indicates how the filters in a [CombinedFilter](./answers-headless.combinedfilter.md) should be combined. |
|  [LocationBiasMethod](./answers-headless.locationbiasmethod.md) | The method used to determine the location. |
|  [Matcher](./answers-headless.matcher.md) | A Matcher is a filtering operation. |
|  [QuerySource](./answers-headless.querysource.md) | The source of the search request. |
|  [QueryTrigger](./answers-headless.querytrigger.md) | Describes the ways a search can be executed besides user input. |
|  [SearchIntent](./answers-headless.searchintent.md) | Represents intents from the Answers API. |
|  [SortType](./answers-headless.sorttype.md) | The method of sorting. |
|  [Source](./answers-headless.source.md) | Represents the source of a [Result](./answers-headless.result.md)<!-- -->. |
|  [SpellCheckType](./answers-headless.spellchecktype.md) | Represents the type of spell check performed. |

## Functions

|  Function | Description |
|  --- | --- |
|  [combineFilters(filterA, filterB, combinator)](./answers-headless.combinefilters.md) | Creates a [CombinedFilter](./answers-headless.combinedfilter.md) by applying the specified [FilterCombinator](./answers-headless.filtercombinator.md) to the two filters. |
|  [createDateRangeFilter(fieldId, range)](./answers-headless.createdaterangefilter.md) | Creates a [Filter](./answers-headless.filter.md) or [CombinedFilter](./answers-headless.combinedfilter.md) that matches all results where the given field value falls in a specific Date [BoundedRange](./answers-headless.boundedrange.md)<!-- -->. |
|  [createEqualsFilter(fieldId, value)](./answers-headless.createequalsfilter.md) | Creates a simple [Filter](./answers-headless.filter.md) that ensures all results will match a specific field value. |
|  [createNearMeFilter(position)](./answers-headless.createnearmefilter.md) | Creates a [Filter](./answers-headless.filter.md) that matches all results within a certain radius of the given position. |
|  [createNumberRangeFilter(fieldId, range)](./answers-headless.createnumberrangefilter.md) | Creates a [Filter](./answers-headless.filter.md) or [CombinedFilter](./answers-headless.combinedfilter.md) that matches all results where the given field value falls in a specific number [BoundedRange](./answers-headless.boundedrange.md)<!-- -->. |
|  [provideAnswersHeadless(config)](./answers-headless.provideanswersheadless.md) | Supplies a new instance of [AnswersHeadless](./answers-headless.answersheadless.md)<!-- -->, using the provided configuration. |

## Interfaces

|  Interface | Description |
|  --- | --- |
|  [AllResultsForVertical](./answers-headless.allresultsforvertical.md) | Represents all results for the current vertical. |
|  [AnswersConfigWithApiKey](./answers-headless.answersconfigwithapikey.md) | Configuration options for [AnswersCore](./answers-headless.answerscore.md)<!-- -->, which includes the options from [BaseAnswersConfig](./answers-headless.baseanswersconfig.md)<!-- -->, but requires apiKey. |
|  [AnswersConfigWithToken](./answers-headless.answersconfigwithtoken.md) | Configuration options for [AnswersCore](./answers-headless.answerscore.md)<!-- -->, which includes the options from [BaseAnswersConfig](./answers-headless.baseanswersconfig.md)<!-- -->, but requires token. |
|  [AppliedQueryFilter](./answers-headless.appliedqueryfilter.md) | A filter that the Answers API applied to the search. |
|  [AutocompleteResponse](./answers-headless.autocompleteresponse.md) | The response of a universal or vertical autocomplete request. |
|  [AutocompleteResult](./answers-headless.autocompleteresult.md) | An autocomplete suggestion. |
|  [BaseAnswersConfig](./answers-headless.baseanswersconfig.md) | The base configuration options for [AnswersCore](./answers-headless.answerscore.md)<!-- -->. |
|  [BoundedRange](./answers-headless.boundedrange.md) | An interface representing a range of values of type T. |
|  [CombinedFilter](./answers-headless.combinedfilter.md) | Represents multiple filters that will be combined to refine results. |
|  [DirectAnswer](./answers-headless.directanswer.md) | A direct answer to a search. |
|  [DirectAnswerState](./answers-headless.directanswerstate.md) | Maintains the direct answer associated with the latest search. |
|  [DisplayableFacet](./answers-headless.displayablefacet.md) | A [Facet](./answers-headless.facet.md) which contains extra fields meant to be displayed to the end user. |
|  [DisplayableFacetOption](./answers-headless.displayablefacetoption.md) | A [FacetOption](./answers-headless.facetoption.md) with extra data meant to be displayed to the end user. |
|  [Endpoints](./answers-headless.endpoints.md) | Overrides for the URLs which are used when making requests to the Answers API. |
|  [Facet](./answers-headless.facet.md) | Represents dynamic filter options for the Answers API. |
|  [FacetOption](./answers-headless.facetoption.md) | A filter associated with the facet. |
|  [FeaturedSnippetDirectAnswer](./answers-headless.featuredsnippetdirectanswer.md) | A direct answer which was found within a document. |
|  [FieldValueDirectAnswer](./answers-headless.fieldvaluedirectanswer.md) | A direct answer where the answer came from a field from the knowledge graph. |
|  [Filter](./answers-headless.filter.md) | Represents a filter which compares values to a single field. |
|  [FilterSearchRequest](./answers-headless.filtersearchrequest.md) | Options for a filtersearch request. |
|  [FilterSearchResponse](./answers-headless.filtersearchresponse.md) | The response of a filtersearch request. |
|  [FiltersState](./answers-headless.filtersstate.md) | Maintains the current state of facets and filters in the application. |
|  [HighlightedValue](./answers-headless.highlightedvalue.md) | A field value and its substring matches as emphasized by the Answers API. |
|  [LatLong](./answers-headless.latlong.md) | The latitude and longitude of the user making the request. Used to bias the results. |
|  [LocationBias](./answers-headless.locationbias.md) | Information about the user's location. |
|  [LocationState](./answers-headless.locationstate.md) | Maintains the user's location, if given, or the inferred location, that is used to bias search results. |
|  [MetaState](./answers-headless.metastate.md) | Maintains the metadata for Answers Headless. |
|  [NearFilterValue](./answers-headless.nearfiltervalue.md) | A filter value for a filter with a $near [Matcher](./answers-headless.matcher.md)<!-- -->. |
|  [ParentState](./answers-headless.parentstate.md) | The overall shape of the redux state tree, with each key value pair of headlessId to [State](./answers-headless.state.md) representing a single AnswersHeadless instance. |
|  [QueryState](./answers-headless.querystate.md) | Maintains the latest query and its associated data. |
|  [QuestionSubmissionRequest](./answers-headless.questionsubmissionrequest.md) | Options for a QuestionSubmission request. |
|  [QuestionSubmissionResponse](./answers-headless.questionsubmissionresponse.md) | A representation of a question submission response. |
|  [RangeBoundary](./answers-headless.rangeboundary.md) | A boundary for a [BoundedRange](./answers-headless.boundedrange.md) of type T. |
|  [Result](./answers-headless.result.md) | An individual search result. |
|  [SearchParameterField](./answers-headless.searchparameterfield.md) | Indicates which entity field to perform the autocomplete request on. |
|  [SearchStatusState](./answers-headless.searchstatusstate.md) | Maintains the status of the latest search. |
|  [SelectableFilter](./answers-headless.selectablefilter.md) | A [Filter](./answers-headless.filter.md) that can be selected and maintains whether or not it is. |
|  [SessionTrackingState](./answers-headless.sessiontrackingstate.md) | Maintains whether the user session should be tracked and, if so, the session information. |
|  [Snippet](./answers-headless.snippet.md) | The section of text where a [FeaturedSnippetDirectAnswer](./answers-headless.featuredsnippetdirectanswer.md) was found. |
|  [SortBy](./answers-headless.sortby.md) | Represents a criterion that can be used to sort results. |
|  [SpellCheck](./answers-headless.spellcheck.md) | A spellcheck response from a search query. |
|  [SpellCheckState](./answers-headless.spellcheckstate.md) | Maintains whether spellcheck is enabled and the spellcheck response from the latest search. |
|  [State](./answers-headless.state.md) | The state representing an AnswersHeadless instance. |
|  [StateListener](./answers-headless.statelistener.md) | Represents a listener for a specific value of type T in the state. |
|  [StateManager](./answers-headless.statemanager.md) | Manages the information contained in the state for an AnswersHeadless instance. |
|  [UniversalAutocompleteRequest](./answers-headless.universalautocompleterequest.md) | Options for a universal autocomplete request. |
|  [UniversalLimit](./answers-headless.universallimit.md) | The maximum limit of results per vertical. Each limit can be set from 1-50, inclusive. |
|  [UniversalSearchRequest](./answers-headless.universalsearchrequest.md) | Options which can be specified for a universal search. |
|  [UniversalSearchResponse](./answers-headless.universalsearchresponse.md) | A representation of a response from a universal search. |
|  [UniversalSearchState](./answers-headless.universalsearchstate.md) | Maintains the data for the latest universal search. |
|  [VerticalAutocompleteRequest](./answers-headless.verticalautocompleterequest.md) | Options for a vertial autocomplete request. |
|  [VerticalResults](./answers-headless.verticalresults.md) | Represents results from a search vertical. |
|  [VerticalSearchRequest](./answers-headless.verticalsearchrequest.md) | Options which can be specified for a vertical search. |
|  [VerticalSearchResponse](./answers-headless.verticalsearchresponse.md) | A representation of a response from a vertical search. |
|  [VerticalSearchState](./answers-headless.verticalsearchstate.md) | Maintains the data for the latest vertical search. |
|  [Visitor](./answers-headless.visitor.md) | Information used to associate requests with a particular user. |

## Variables

|  Variable | Description |
|  --- | --- |
|  [answersUtilities](./answers-headless.answersutilities.md) |  |
|  [DEFAULT\_HEADLESS\_ID](./answers-headless.default_headless_id.md) | The headlessId automatically given to the first AnswersHeadless instance created. |

## Type Aliases

|  Type Alias | Description |
|  --- | --- |
|  [AnswersConfig](./answers-headless.answersconfig.md) | The main configuration options for [AnswersCore](./answers-headless.answerscore.md)<!-- -->. For a full description of the options, see [BaseAnswersConfig](./answers-headless.baseanswersconfig.md)<!-- -->. The config requires either an apiKey or a token. |
|  [Context](./answers-headless.context.md) | Used to trigger Answers [Query Rules](https://hitchhikers.yext.com/tracks/answers-advanced/ans302-query-rules/)<!-- -->. |
|  [FilterTypes](./answers-headless.filtertypes.md) | A union type for the different kinds of filter. |
|  [HeadlessConfig](./answers-headless.headlessconfig.md) | The configuration for an AnswersHeadless instance. |
|  [HighlightedFields](./answers-headless.highlightedfields.md) | A mapping of fields to the values emphasized by the Answers API |
