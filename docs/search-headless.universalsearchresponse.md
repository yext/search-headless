<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/search-headless](./search-headless.md) &gt; [UniversalSearchResponse](./search-headless.universalsearchresponse.md)

## UniversalSearchResponse interface

A representation of a response from a universal search.

<b>Signature:</b>

```typescript
export declare interface UniversalSearchResponse 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [directAnswer?](./search-headless.universalsearchresponse.directanswer.md) | [FeaturedSnippetDirectAnswer](./search-headless.featuredsnippetdirectanswer.md) \| [FieldValueDirectAnswer](./search-headless.fieldvaluedirectanswer.md) | <i>(Optional)</i> A direct answer to a search. |
|  [failedVerticals?](./search-headless.universalsearchresponse.failedverticals.md) | [FailedVertical](./search-headless.failedvertical.md)<!-- -->\[\] | <i>(Optional)</i> Error information from when a vertical fails to return results. |
|  [locationBias?](./search-headless.universalsearchresponse.locationbias.md) | [LocationBias](./search-headless.locationbias.md) | <i>(Optional)</i> Information about the user's location. |
|  [queryId?](./search-headless.universalsearchresponse.queryid.md) | string | <i>(Optional)</i> The ID of the search query. |
|  [queryRulesActionsData?](./search-headless.universalsearchresponse.queryrulesactionsdata.md) | [QueryRulesActionsData](./search-headless.queryrulesactionsdata.md)<!-- -->\[\] | <i>(Optional)</i> Data returned from the Answers query rules system. |
|  [searchIntents?](./search-headless.universalsearchresponse.searchintents.md) | [SearchIntent](./search-headless.searchintent.md)<!-- -->\[\] | <i>(Optional)</i> An array of [SearchIntent](./search-headless.searchintent.md)<!-- -->s which represents requests from the API. |
|  [spellCheck?](./search-headless.universalsearchresponse.spellcheck.md) | [SpellCheck](./search-headless.spellcheck.md) | <i>(Optional)</i> A spellcheck response from a search query. |
|  [uuid](./search-headless.universalsearchresponse.uuid.md) | string | A unique id which corresponds to the request. |
|  [verticalResults](./search-headless.universalsearchresponse.verticalresults.md) | [VerticalResults](./search-headless.verticalresults.md)<!-- -->\[\] | An array of [VerticalResults](./search-headless.verticalresults.md) which represent the results for each vertical. |
