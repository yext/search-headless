<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/answers-headless](./answers-headless.md) &gt; [AnswersHeadless](./answers-headless.answersheadless.md) &gt; [addListener](./answers-headless.answersheadless.addlistener.md)

## AnswersHeadless.addListener() method

Adds a listener for a specific state value of type T.

<b>Signature:</b>

```typescript
addListener<T>(listener: StateListener<T>): Unsubscribe;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  listener | StateListener&lt;T&gt; | The listener to add |

<b>Returns:</b>

Unsubscribe

The function for removing the added listener
