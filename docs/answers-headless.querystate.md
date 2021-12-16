<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/answers-headless](./answers-headless.md) &gt; [QueryState](./answers-headless.querystate.md)

## QueryState interface

Maintains the latest query and its associated data.

<b>Signature:</b>

```typescript
export interface QueryState 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [input?](./answers-headless.querystate.input.md) | string | <i>(Optional)</i> The user input used for the next search query. |
|  [mostRecentSearch?](./answers-headless.querystate.mostrecentsearch.md) | string | <i>(Optional)</i> The query of the most recent search. |
|  [queryId?](./answers-headless.querystate.queryid.md) | string | <i>(Optional)</i> The ID of the query from the latest search. |
|  [querySource?](./answers-headless.querystate.querysource.md) | [QuerySource](./answers-headless.querysource.md) | <i>(Optional)</i> The source of the query (either from a standard Answers integration or from an Answers overlay). |
|  [queryTrigger?](./answers-headless.querystate.querytrigger.md) | [QueryTrigger](./answers-headless.querytrigger.md) | <i>(Optional)</i> How the query was triggered (besides user input). |
|  [searchIntents?](./answers-headless.querystate.searchintents.md) | [SearchIntent](./answers-headless.searchintent.md)<!-- -->\[\] | <i>(Optional)</i> The computed intents of the mostRecentSearch, as returned by the Answers API. |
