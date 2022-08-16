<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/search-headless](./search-headless.md) &gt; [ConjunctionStaticFilter](./search-headless.conjunctionstaticfilter.md)

## ConjunctionStaticFilter interface

A static filter composed by combining other static filters with the logical AND operator.

<b>Signature:</b>

```typescript
export declare interface ConjunctionStaticFilter 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [combinator](./search-headless.conjunctionstaticfilter.combinator.md) | [FilterCombinator.AND](./search-headless.filtercombinator.md) | Indicates that filters should be combined with a logical AND. |
|  [filters](./search-headless.conjunctionstaticfilter.filters.md) | [StaticFilter](./search-headless.staticfilter.md)<!-- -->\[\] | The filters to combine together. |
|  [kind](./search-headless.conjunctionstaticfilter.kind.md) | 'conjunction' | The kind of static filter. |
