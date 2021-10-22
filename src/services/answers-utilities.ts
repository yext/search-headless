import { DisplayableFacet } from '@yext/answers-core';

/** {@inheritDoc AnswersUtilitiesImpl} */
export default interface AnswersUtilities {
  searchThroughFacet: (facet: DisplayableFacet, searchTerm: string) => DisplayableFacet
}