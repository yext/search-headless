<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@yext/answers-headless](./answers-headless.md) &gt; [answersUtilities](./answers-headless.answersutilities.md) &gt; [searchThroughFacet](./answers-headless.answersutilities.searchthroughfacet.md)

## answersUtilities.searchThroughFacet() function

Searches through the specified facet and filters out the options that aren't a close match for the given searchTerm. The comparison is case insensitive.

<b>Signature:</b>

```typescript
export declare function searchThroughFacet(facet: DisplayableFacet, searchTerm: string): DisplayableFacet;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  facet | [DisplayableFacet](./answers-headless.displayablefacet.md) | The facet whose options are searched through |
|  searchTerm | string | The search term to compare the facet options against |

<b>Returns:</b>

[DisplayableFacet](./answers-headless.displayablefacet.md)

The facet with only its options that are a close match for the searchTerm
