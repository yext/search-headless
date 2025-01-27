<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/search-headless](./search-headless.md) &gt; [SearchCore](./search-headless.searchcore.md) &gt; [universalAutocomplete](./search-headless.searchcore.universalautocomplete.md)

## SearchCore.universalAutocomplete() method

Performs an autocomplete request across all verticals.

**Signature:**

```typescript
universalAutocomplete(request: UniversalAutocompleteRequest): Promise<AutocompleteResponse>;
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

request


</td><td>

[UniversalAutocompleteRequest](./search-headless.universalautocompleterequest.md)


</td><td>

Universal autocomplete request options


</td></tr>
</tbody></table>
**Returns:**

Promise&lt;[AutocompleteResponse](./search-headless.autocompleteresponse.md)<!-- -->&gt;

## Remarks

If rejected, the reason will be an [SearchError](./search-headless.searcherror.md)<!-- -->.

