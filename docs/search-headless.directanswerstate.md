<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/search-headless](./search-headless.md) &gt; [DirectAnswerState](./search-headless.directanswerstate.md)

## DirectAnswerState interface

Maintains the direct answer associated with the latest search.

<b>Signature:</b>

```typescript
export interface DirectAnswerState 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [result?](./search-headless.directanswerstate.result.md) | [FeaturedSnippetDirectAnswer](./search-headless.featuredsnippetdirectanswer.md) \| [FieldValueDirectAnswer](./search-headless.fieldvaluedirectanswer.md) | <i>(Optional)</i> The data for the direct answer. The type of the data is determined by the Answers API based on whether the answer was found within a document or was a field value in the knowledge graph. |
