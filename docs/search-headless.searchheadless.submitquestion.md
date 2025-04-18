<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/search-headless](./search-headless.md) &gt; [SearchHeadless](./search-headless.searchheadless.md) &gt; [submitQuestion](./search-headless.searchheadless.submitquestion.md)

## SearchHeadless.submitQuestion() method

Submits a question to the Search API with the specified request data.

**Signature:**

```typescript
submitQuestion(request: Omit<QuestionSubmissionRequest, 'additionalHttpHeaders'>): Promise<QuestionSubmissionResponse>;
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

Omit&lt;[QuestionSubmissionRequest](./search-headless.questionsubmissionrequest.md)<!-- -->, 'additionalHttpHeaders'&gt;


</td><td>

The data for the network request


</td></tr>
</tbody></table>
**Returns:**

Promise&lt;[QuestionSubmissionResponse](./search-headless.questionsubmissionresponse.md)<!-- -->&gt;

A Promise of a [QuestionSubmissionResponse](./search-headless.questionsubmissionresponse.md) from the Search API

