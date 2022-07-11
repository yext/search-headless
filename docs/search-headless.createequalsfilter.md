<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/search-headless](./search-headless.md) &gt; [createEqualsFilter](./search-headless.createequalsfilter.md)

## createEqualsFilter() function

Creates a simple [Filter](./search-headless.filter.md) that ensures all results will match a specific field value.

<b>Signature:</b>

```typescript
export declare function createEqualsFilter(fieldId: string, value: string | number | boolean): Filter;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  fieldId | string | The comparison field's identifier |
|  value | string \| number \| boolean | The value to match |

<b>Returns:</b>

[Filter](./search-headless.filter.md)

The newly created [Filter](./search-headless.filter.md) for the field value
