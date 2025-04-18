<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/search-headless](./search-headless.md) &gt; [UniversalSearchState](./search-headless.universalsearchstate.md)

## UniversalSearchState interface

Maintains the data for the latest universal search.

**Signature:**

```typescript
export interface UniversalSearchState 
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

[limit?](./search-headless.universalsearchstate.limit.md)


</td><td>


</td><td>

[UniversalLimit](./search-headless.universallimit.md)


</td><td>

_(Optional)_ An object defining the limit (up to how many results should be returned) for each vertical.


</td></tr>
<tr><td>

[restrictVerticals?](./search-headless.universalsearchstate.restrictverticals.md)


</td><td>


</td><td>

string\[\]


</td><td>

_(Optional)_ If included, the verticals to which the universal search should be restricted.


</td></tr>
<tr><td>

[verticals?](./search-headless.universalsearchstate.verticals.md)


</td><td>


</td><td>

[VerticalResults](./search-headless.verticalresults.md)<!-- -->\[\]


</td><td>

_(Optional)_ The results from each vertical included in the universal search.


</td></tr>
</tbody></table>
