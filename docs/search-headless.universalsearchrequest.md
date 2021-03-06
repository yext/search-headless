<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/search-headless](./search-headless.md) &gt; [UniversalSearchRequest](./search-headless.universalsearchrequest.md)

## UniversalSearchRequest interface

Options which can be specified for a universal search.

<b>Signature:</b>

```typescript
export declare interface UniversalSearchRequest extends SearchRequest 
```
<b>Extends:</b> [SearchRequest](./search-headless.searchrequest.md)

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [context?](./search-headless.universalsearchrequest.context.md) | [Context](./search-headless.context.md) | <i>(Optional)</i> Used to trigger Search [Query Rules](https://hitchhikers.yext.com/tracks/answers-advanced/ans302-query-rules/)<!-- -->. |
|  [limit?](./search-headless.universalsearchrequest.limit.md) | [UniversalLimit](./search-headless.universallimit.md) | <i>(Optional)</i> The maximum limit of results per vertical. Each limit can be set from 1-50, inclusive. |
|  [location?](./search-headless.universalsearchrequest.location.md) | [LatLong](./search-headless.latlong.md) | <i>(Optional)</i> The latitude and longitude of the user making the request. Used to bias the results. |
|  [query](./search-headless.universalsearchrequest.query.md) | string | The search query. |
|  [querySource?](./search-headless.universalsearchrequest.querysource.md) | [QuerySource](./search-headless.querysource.md) \| string | <i>(Optional)</i> The source of the search request. |
|  [queryTrigger?](./search-headless.universalsearchrequest.querytrigger.md) | [QueryTrigger](./search-headless.querytrigger.md) | <i>(Optional)</i> Describes the ways a search can be executed besides user input. |
|  [referrerPageUrl?](./search-headless.universalsearchrequest.referrerpageurl.md) | string | <i>(Optional)</i> The URl of the page which referred the user to the current page. |
|  [restrictVerticals?](./search-headless.universalsearchrequest.restrictverticals.md) | string\[\] | <i>(Optional)</i> If included, the response will only include these verticals. |
|  [sessionId?](./search-headless.universalsearchrequest.sessionid.md) | string | <i>(Optional)</i> Used to track session state when cookies are blocked. |
|  [sessionTrackingEnabled?](./search-headless.universalsearchrequest.sessiontrackingenabled.md) | boolean | <i>(Optional)</i> Enables session tracking. |
|  [skipSpellCheck?](./search-headless.universalsearchrequest.skipspellcheck.md) | boolean | <i>(Optional)</i> Disables spellcheck if true. |

