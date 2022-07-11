<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/search-headless](./search-headless.md) &gt; [HighlightedValue](./search-headless.highlightedvalue.md) &gt; [matchedSubstrings](./search-headless.highlightedvalue.matchedsubstrings.md)

## HighlightedValue.matchedSubstrings property

An array of substring matches which correspond to the highlighting.

<b>Signature:</b>

```typescript
matchedSubstrings: {
        length: number;
        offset: number;
    }[];
```

## Remarks

Offset indicates the index of the match, and the length indicates the number of characters of the match.

## Example

A user may search for 'Yext', and the result may include the value 'Yext is a search company'. The matched substrings would correspond to 'Yext' and the matchedSubstrings array would be: `[{ length: 4, offset: 0 }]`
