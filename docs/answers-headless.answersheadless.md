<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/answers-headless](./answers-headless.md) &gt; [AnswersHeadless](./answers-headless.answersheadless.md)

## AnswersHeadless class

Provides the functionality for interacting with an Answers Search experience.

<b>Signature:</b>

```typescript
export default class AnswersHeadless 
```

## Remarks

The constructor for this class is marked as internal. Third-party code should not call the constructor directly or create subclasses that extend the `AnswersHeadless` class.

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [state](./answers-headless.answersheadless.state.md) |  | [State](./answers-headless.state.md) | Gets the current state of the AnswersHeadless instance. |
|  [utilities](./answers-headless.answersheadless.utilities.md) |  | { searchThroughFacet(facet: [DisplayableFacet](./answers-headless.displayablefacet.md)<!-- -->, searchTerm: string): [DisplayableFacet](./answers-headless.displayablefacet.md)<!-- -->; } | Common utility functions for manipulating Answers-related data. |

## Methods

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [addListener(listener)](./answers-headless.answersheadless.addlistener.md) |  | Adds a listener for a specific state value of type T. |
|  [executeFilterSearch(query, sectioned, fields)](./answers-headless.answersheadless.executefiltersearch.md) |  | Performs a filtersearch request against specified fields within a single vertical using the vertical key stored in state. |
|  [executeUniversalAutocomplete()](./answers-headless.answersheadless.executeuniversalautocomplete.md) |  | Performs an autocomplete request across all verticals using the query input stored in state. |
|  [executeUniversalQuery()](./answers-headless.answersheadless.executeuniversalquery.md) |  | Performs an Answers search across all verticals with relevant parts of the state used as input to the search. Updates the state with the response data. |
|  [executeVerticalAutocomplete()](./answers-headless.answersheadless.executeverticalautocomplete.md) |  | Performs an autocomplete request for a single vertical using the query input and vertical key stored in state. |
|  [executeVerticalQuery()](./answers-headless.answersheadless.executeverticalquery.md) |  | Perform an Answers search for a single vertical with relevant parts of the state used as input to the search. Updates the state with the response data. |
|  [resetFacets()](./answers-headless.answersheadless.resetfacets.md) |  | Unselects all [facets](./answers-headless.filtersstate.facets.md)<!-- -->. |
|  [setAlternativeVerticals(alternativeVerticals)](./answers-headless.answersheadless.setalternativeverticals.md) |  | Sets the alternativeVerticals for [VerticalSearchState.noResults](./answers-headless.verticalsearchstate.noresults.md) to the specified verticals. |
|  [setContext(context)](./answers-headless.answersheadless.setcontext.md) |  | Sets [MetaState.context](./answers-headless.metastate.context.md) to the specified context. |
|  [setFacetOption(fieldId, facetOption, selected)](./answers-headless.answersheadless.setfacetoption.md) |  | Sets a specified facet option to be selected or unselected. |
|  [setFacets(facets)](./answers-headless.answersheadless.setfacets.md) |  | Sets [FiltersState.facets](./answers-headless.filtersstate.facets.md) to the specified facets. |
|  [setFilterOption(seletableFilter)](./answers-headless.answersheadless.setfilteroption.md) |  | Sets a static filter option and whether or not it is selected in state. |
|  [setOffset(offset)](./answers-headless.answersheadless.setoffset.md) |  | Sets [VerticalSearchState.offset](./answers-headless.verticalsearchstate.offset.md) to the specified offset. |
|  [setQuery(input)](./answers-headless.answersheadless.setquery.md) |  | Sets [QueryState.input](./answers-headless.querystate.input.md) to the specified input. |
|  [setQuerySource(source)](./answers-headless.answersheadless.setquerysource.md) |  | Sets [QueryState.querySource](./answers-headless.querystate.querysource.md) to the specified source. |
|  [setQueryTrigger(trigger)](./answers-headless.answersheadless.setquerytrigger.md) |  | Sets [QueryState.queryTrigger](./answers-headless.querystate.querytrigger.md) to the specified trigger. |
|  [setReferrerPageUrl(referrerPageUrl)](./answers-headless.answersheadless.setreferrerpageurl.md) |  | Sets [MetaState.referrerPageUrl](./answers-headless.metastate.referrerpageurl.md) to the specified URL. |
|  [setRestrictVerticals(restrictVerticals)](./answers-headless.answersheadless.setrestrictverticals.md) |  | Sets [UniversalSearchState.restrictVerticals](./answers-headless.universalsearchstate.restrictverticals.md) to the specified vertical keys. |
|  [setSessionId(sessionId)](./answers-headless.answersheadless.setsessionid.md) |  | Sets [SessionTrackingState.sessionId](./answers-headless.sessiontrackingstate.sessionid.md) to the specified ID. |
|  [setSessionTrackingEnabled(enabled)](./answers-headless.answersheadless.setsessiontrackingenabled.md) |  | Sets [SessionTrackingState.enabled](./answers-headless.sessiontrackingstate.enabled.md) to the specified boolean value. |
|  [setSortBys(sortBys)](./answers-headless.answersheadless.setsortbys.md) |  | Sets [VerticalSearchState.sortBys](./answers-headless.verticalsearchstate.sortbys.md) to the specified sortBys. |
|  [setSpellCheckEnabled(enabled)](./answers-headless.answersheadless.setspellcheckenabled.md) |  | Sets [SpellCheckState.enabled](./answers-headless.spellcheckstate.enabled.md) to the specified boolean value. |
|  [setState(state)](./answers-headless.answersheadless.setstate.md) |  | Sets the [State](./answers-headless.state.md) to the specified state. |
|  [setStaticFilters(filters)](./answers-headless.answersheadless.setstaticfilters.md) |  | Sets [FiltersState.static](./answers-headless.filtersstate.static.md) to the specified filters. |
|  [setUniversal()](./answers-headless.answersheadless.setuniversal.md) |  | Sets up Headless to manage universal searches. |
|  [setUniversalLimit(limit)](./answers-headless.answersheadless.setuniversallimit.md) |  | Sets [UniversalSearchState.limit](./answers-headless.universalsearchstate.limit.md) to the specified limit. |
|  [setUserLocation(latLong)](./answers-headless.answersheadless.setuserlocation.md) |  | Sets [LocationState.userLocation](./answers-headless.locationstate.userlocation.md) to the specified latitude and longitude. |
|  [setVertical(verticalKey)](./answers-headless.answersheadless.setvertical.md) |  | Sets up Headless to manage the vertical indicated by the verticalKey. |
|  [setVerticalLimit(limit)](./answers-headless.answersheadless.setverticallimit.md) |  | Sets [VerticalSearchState.limit](./answers-headless.verticalsearchstate.limit.md) to the specified limit. |
|  [submitQuestion(request)](./answers-headless.answersheadless.submitquestion.md) |  | Submits a question to the Answers API with the specified request data. |
