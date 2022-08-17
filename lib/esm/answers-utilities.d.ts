import { DisplayableFacet } from '@yext/answers-core';
/**
 * Searches through the specified facet and filters out the options that aren't a
 * close match for the given searchTerm. The comparison is case insensitive.
 *
 * @param facet - The facet whose options are searched through
 * @param searchTerm - The search term to compare the facet options against
 * @returns The facet with only its options that are a close match for the
 *          searchTerm
 *
 * @public
 */
export declare function searchThroughFacet(facet: DisplayableFacet, searchTerm: string): DisplayableFacet;
/**
 * Checks if the searchTerm is a case-insensitive, Levenshtein match for the value.
 *
 * @param value - The string to compare against
 * @param searchTerm - The term being searched for
 * @returns Whether or not the searchTerm is a substring of or a close Levenshtein match
 *          for the value
 *
 * @public
 */
export declare function isCloseMatch(value: string, searchTerm: string): boolean;
//# sourceMappingURL=answers-utilities.d.ts.map