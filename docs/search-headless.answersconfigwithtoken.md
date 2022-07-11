<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/search-headless](./search-headless.md) &gt; [AnswersConfigWithToken](./search-headless.answersconfigwithtoken.md)

## AnswersConfigWithToken interface

Configuration options for [AnswersCore](./search-headless.answerscore.md)<!-- -->, which includes the options from [BaseAnswersConfig](./search-headless.baseanswersconfig.md)<!-- -->, but requires token.

<b>Signature:</b>

```typescript
export declare interface AnswersConfigWithToken extends BaseAnswersConfig 
```
<b>Extends:</b> [BaseAnswersConfig](./search-headless.baseanswersconfig.md)

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [apiKey?](./search-headless.answersconfigwithtoken.apikey.md) | never | <i>(Optional)</i> apiKey should NOT be provided along with token. |
|  [token](./search-headless.answersconfigwithtoken.token.md) | string | The authentication token of the answers experience which will be passed in the Auth header as a Bearer token. |
