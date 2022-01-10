import { DisplayableFacet } from '@yext/answers-core';
import { isLevenshteinMatch } from './utils/searchable-facets';

export default {
  /**
   * Searches through the specified facet and filters out the options that aren't a
   * close match for the given searchTerm. The comparison is case insensitive.
   *
   * @param facet - The facet whose options are searched through
   * @param searchTerm - The search term to compare the facet options against
   * @returns The facet with only its options that are a close match for the
   *          searchTerm
   */
  searchThroughFacet(facet: DisplayableFacet, searchTerm: string): DisplayableFacet {
    return {
      ...facet,
      options: facet.options.filter(o =>
        isLevenshteinMatch(o.displayName.toLowerCase(), searchTerm.toLowerCase())
      )
    };
  }
};