import { DisplayableFacet } from '@yext/answers-core';

export default interface AnswersUtilities {
  searchThroughFacet: (facet: DisplayableFacet, searchTerm: string) => DisplayableFacet
}