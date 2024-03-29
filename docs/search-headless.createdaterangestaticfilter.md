<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/search-headless](./search-headless.md) &gt; [createDateRangeStaticFilter](./search-headless.createdaterangestaticfilter.md)

## createDateRangeStaticFilter() function

Creates a [StaticFilter](./search-headless.staticfilter.md) that matches all results where the given field value falls in a specific Date [BoundedRange](./search-headless.boundedrange.md)<!-- -->.

<b>Signature:</b>

```typescript
export declare function createDateRangeStaticFilter(fieldId: string, range: BoundedRange<Date>): StaticFilter;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  fieldId | string | The comparison field's identifier |
|  range | [BoundedRange](./search-headless.boundedrange.md)<!-- -->&lt;Date&gt; | The acceptable date range |

<b>Returns:</b>

[StaticFilter](./search-headless.staticfilter.md)

The newly created static filter for the field value range

