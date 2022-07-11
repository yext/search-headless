<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/search-headless](./search-headless.md) &gt; [AnswersCore](./search-headless.answerscore.md) &gt; [verticalAutocomplete](./search-headless.answerscore.verticalautocomplete.md)

## AnswersCore.verticalAutocomplete() method

Performs an autocomplete request for a single vertical.

<b>Signature:</b>

```typescript
verticalAutocomplete(request: VerticalAutocompleteRequest): Promise<AutocompleteResponse>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  request | [VerticalAutocompleteRequest](./search-headless.verticalautocompleterequest.md) | Vertical autocomplete request options |

<b>Returns:</b>

Promise&lt;[AutocompleteResponse](./search-headless.autocompleteresponse.md)<!-- -->&gt;

## Remarks

If rejected, the reason will be an [AnswersError](./search-headless.answerserror.md)<!-- -->.
