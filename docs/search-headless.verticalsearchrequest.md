<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/search-headless](./search-headless.md) &gt; [VerticalSearchRequest](./search-headless.verticalsearchrequest.md)

## VerticalSearchRequest interface

Options which can be specified for a vertical search.

<b>Signature:</b>

```typescript
export declare interface VerticalSearchRequest extends SearchRequest 
```
<b>Extends:</b> [SearchRequest](./search-headless.searchrequest.md)

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [context?](./search-headless.verticalsearchrequest.context.md) | [Context](./search-headless.context.md) | <i>(Optional)</i> Used to trigger Search [Query Rules](https://hitchhikers.yext.com/tracks/answers-advanced/ans302-query-rules/)<!-- -->. |
|  [facets?](./search-headless.verticalsearchrequest.facets.md) | [Facet](./search-headless.facet.md)<!-- -->\[\] | <i>(Optional)</i> The facet filters to apply to the search. |
|  [limit?](./search-headless.verticalsearchrequest.limit.md) | number | <i>(Optional)</i> The maximum number of results to include with a max of 50. |
|  [location?](./search-headless.verticalsearchrequest.location.md) | [LatLong](./search-headless.latlong.md) | <i>(Optional)</i> The latitude and longitude of the user making the request. Used to bias the results. |
|  [locationRadius?](./search-headless.verticalsearchrequest.locationradius.md) | number | <i>(Optional)</i> The radius (in meters) to filter the vertical search by. |
|  [offset?](./search-headless.verticalsearchrequest.offset.md) | number | <i>(Optional)</i> The result offset which allows for fetching more results with the same query. |
|  [query](./search-headless.verticalsearchrequest.query.md) | string | The search query. |
|  [queryId?](./search-headless.verticalsearchrequest.queryid.md) | string | <i>(Optional)</i> The queryId for the query, if this is a repeat query. |
|  [querySource?](./search-headless.verticalsearchrequest.querysource.md) | [QuerySource](./search-headless.querysource.md) \| string | <i>(Optional)</i> The source of the search request. |
|  [queryTrigger?](./search-headless.verticalsearchrequest.querytrigger.md) | [QueryTrigger](./search-headless.querytrigger.md) | <i>(Optional)</i> Describes the ways a search can be executed besides user input. |
|  [referrerPageUrl?](./search-headless.verticalsearchrequest.referrerpageurl.md) | string | <i>(Optional)</i> The URl of the page which referred the user to the current page. |
|  [retrieveFacets?](./search-headless.verticalsearchrequest.retrievefacets.md) | boolean | <i>(Optional)</i> Indicates that facets should be retrieved. |
|  [sessionId?](./search-headless.verticalsearchrequest.sessionid.md) | string | <i>(Optional)</i> Used to track session state when cookies are blocked. |
|  [sessionTrackingEnabled?](./search-headless.verticalsearchrequest.sessiontrackingenabled.md) | boolean | <i>(Optional)</i> Enables session tracking. |
|  [skipSpellCheck?](./search-headless.verticalsearchrequest.skipspellcheck.md) | boolean | <i>(Optional)</i> Skips spell checking if true. |
|  [sortBys?](./search-headless.verticalsearchrequest.sortbys.md) | [SortBy](./search-headless.sortby.md)<!-- -->\[\] | <i>(Optional)</i> Determines how results are sorted. \* |
|  [staticFilter?](./search-headless.verticalsearchrequest.staticfilter.md) | [StaticFilter](./search-headless.staticfilter.md) | <i>(Optional)</i> The static filter to apply to the search. |
|  [verticalKey](./search-headless.verticalsearchrequest.verticalkey.md) | string | The key associated with the vertical. |

