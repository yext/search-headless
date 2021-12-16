<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/answers-headless](./answers-headless.md) &gt; [FilterSearchResponse](./answers-headless.filtersearchresponse.md)

## FilterSearchResponse interface

The response of a filtersearch request.

<b>Signature:</b>

```typescript
export declare interface FilterSearchResponse 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [businessId?](./answers-headless.filtersearchresponse.businessid.md) | string | <i>(Optional)</i> ID of the account associated with this Answers experience |
|  [queryId?](./answers-headless.filtersearchresponse.queryid.md) | string | <i>(Optional)</i> The ID of the search query. |
|  [sections](./answers-headless.filtersearchresponse.sections.md) | { label?: string; results: [AutocompleteResult](./answers-headless.autocompleteresult.md)<!-- -->\[\]; }\[\] | Represents autocomplete results separated by field. |
|  [uuid](./answers-headless.filtersearchresponse.uuid.md) | string | A unique id which corresponds to the request. |
