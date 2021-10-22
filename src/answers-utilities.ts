import { DisplayableFacet } from '@yext/answers-core';
import { isLevenshteinMatch } from './utils/searchable-facets';

/**
 * Responsible for providing utility functions for Answers Headless
 */
export default class AnswersUtilitiesImpl {
  searchThroughFacet(facet: DisplayableFacet, searchTerm: string): DisplayableFacet {
    return {
      ...facet,
      options: facet.options.filter(o => isLevenshteinMatch(o.displayName, searchTerm))
    };
  }
}