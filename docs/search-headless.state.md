<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/search-headless](./search-headless.md) &gt; [State](./search-headless.state.md)

## State interface

The state representing a SearchHeadless instance.

<b>Signature:</b>

```typescript
export interface State 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [directAnswer](./search-headless.state.directanswer.md) | [DirectAnswerState](./search-headless.directanswerstate.md) | Maintains the direct answer associated with the latest search. |
|  [filters](./search-headless.state.filters.md) | [FiltersState](./search-headless.filtersstate.md) | Maintains the current state of facets and filters in the application. |
|  [location](./search-headless.state.location.md) | [LocationState](./search-headless.locationstate.md) | Maintains the user's location, if given, or the inferred location, that is used to bias search results. |
|  [meta](./search-headless.state.meta.md) | [MetaState](./search-headless.metastate.md) | Maintains the metadata for Answers Headless. |
|  [query](./search-headless.state.query.md) | [QueryState](./search-headless.querystate.md) | Maintains the latest query and its associated data. |
|  [queryRules](./search-headless.state.queryrules.md) | [QueryRulesState](./search-headless.queryrulesstate.md) | Maintains the data from the triggered query rules. |
|  [searchStatus](./search-headless.state.searchstatus.md) | [SearchStatusState](./search-headless.searchstatusstate.md) | Maintains the status of the latest search. |
|  [sessionTracking](./search-headless.state.sessiontracking.md) | [SessionTrackingState](./search-headless.sessiontrackingstate.md) | Maintains whether the user session should be tracked and, if so, the session information. |
|  [spellCheck](./search-headless.state.spellcheck.md) | [SpellCheckState](./search-headless.spellcheckstate.md) | Maintains whether spellcheck is enabled and the spellcheck response from the latest search. |
|  [universal](./search-headless.state.universal.md) | [UniversalSearchState](./search-headless.universalsearchstate.md) | Maintains the data for the latest universal search. |
|  [vertical](./search-headless.state.vertical.md) | [VerticalSearchState](./search-headless.verticalsearchstate.md) | Maintains the data for the latest vertical search. |
