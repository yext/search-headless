<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/search-headless](./search-headless.md) &gt; [SearchConfigWithApiKey](./search-headless.searchconfigwithapikey.md)

## SearchConfigWithApiKey interface

Configuration options for [SearchCore](./search-headless.searchcore.md)<!-- -->, which includes the options from [BaseSearchConfig](./search-headless.basesearchconfig.md)<!-- -->, but requires apiKey.

<b>Signature:</b>

```typescript
export declare interface SearchConfigWithApiKey extends BaseSearchConfig 
```
<b>Extends:</b> [BaseSearchConfig](./search-headless.basesearchconfig.md)

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [apiKey](./search-headless.searchconfigwithapikey.apikey.md) | string | The api key of the search experience which will be sent as a query param. |
|  [token?](./search-headless.searchconfigwithapikey.token.md) | never | <i>(Optional)</i> token should NOT be provided along with apiKey. |
