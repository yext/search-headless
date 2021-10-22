import { DisplayableFacet } from '@yext/answers-core';
import { isLevenshteinMatch } from './utils/searchable-facets';

export default {
  searchThroughFacet(facet: DisplayableFacet, searchTerm: string): DisplayableFacet {
    return {
      ...facet,
      options: facet.options.filter(o => isLevenshteinMatch(o.displayName, searchTerm))
    };
  }
};