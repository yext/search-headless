<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/search-headless](./search-headless.md) &gt; [DisjunctionStaticFilter](./search-headless.disjunctionstaticfilter.md)

## DisjunctionStaticFilter interface

A static filter composed by combining filters with the logical OR operator. The combined filters can either be field value filters or other disjunction filters.

**Signature:**

```typescript
export declare interface DisjunctionStaticFilter 
```

## Properties

<table><thead><tr><th>

Property


</th><th>

Modifiers


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

[combinator](./search-headless.disjunctionstaticfilter.combinator.md)


</td><td>


</td><td>

[FilterCombinator.OR](./search-headless.filtercombinator.md)


</td><td>

Indicates that filters should be combined with a logical OR.


</td></tr>
<tr><td>

[filters](./search-headless.disjunctionstaticfilter.filters.md)


</td><td>


</td><td>

([DisjunctionStaticFilter](./search-headless.disjunctionstaticfilter.md) \| [FieldValueStaticFilter](./search-headless.fieldvaluestaticfilter.md)<!-- -->)\[\]


</td><td>

The filters to combine together.


</td></tr>
<tr><td>

[kind](./search-headless.disjunctionstaticfilter.kind.md)


</td><td>


</td><td>

'disjunction'


</td><td>

The kind of static filter.


</td></tr>
</tbody></table>
