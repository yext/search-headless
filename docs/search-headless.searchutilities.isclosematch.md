<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/search-headless](./search-headless.md) &gt; [searchUtilities](./search-headless.searchutilities.md) &gt; [isCloseMatch](./search-headless.searchutilities.isclosematch.md)

## searchUtilities.isCloseMatch() function

Checks if the searchTerm is a case-insensitive, Levenshtein match for the value.

**Signature:**

```typescript
export declare function isCloseMatch(value: string, searchTerm: string): boolean;
```

## Parameters

<table><thead><tr><th>

Parameter


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

value


</td><td>

string


</td><td>

The string to compare against


</td></tr>
<tr><td>

searchTerm


</td><td>

string


</td><td>

The term being searched for


</td></tr>
</tbody></table>
**Returns:**

boolean

Whether or not the searchTerm is a substring of or a close Levenshtein match for the value

