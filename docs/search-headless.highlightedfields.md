<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/search-headless](./search-headless.md) &gt; [HighlightedFields](./search-headless.highlightedfields.md)

## HighlightedFields type

A mapping of fields to the values emphasized by the Answers API

<b>Signature:</b>

```typescript
export declare type HighlightedFields = {
    [fieldId: string]: HighlightedValue | HighlightedValue[] | HighlightedFields | HighlightedFields[];
};
```
<b>References:</b> [HighlightedValue](./search-headless.highlightedvalue.md)<!-- -->, [HighlightedFields](./search-headless.highlightedfields.md)

## Remarks

Only fields that have been marked as highlighted will be present - which may not be all fields of the corresponding [Result](./search-headless.result.md)<!-- -->'s rawData. Fields that are present will match the rawData's structure and order.

## Example

If a user searches for 'apple', the API will likely match fields that contain the word 'apple'.

```js
{
  description: {
    value: 'likes apple pie and green apples',
    matchedSubstrings: [
      { offset: 6, length: 5 },
      { offset: 26, length: 5 }
    ]
  },
  c_favoriteFruits: [
    {
      apples: [
        {
          value: 'Granny Smith',
          matchedSubstrings: []
        },
        {
          value: 'Upton Pyne Apple',
          matchedSubstrings: [{ offset: 11, length: 5}]
        }
      ],
      pears: [
        {
          value: 'Callery Pear',
          matchedSubstrings: []
        }
      ]
    }
  ]
}
```
