/**
 * Given some value, determines whether it contains a "similar enough" match for the given searchTerm.
 *
 * @param value - The string to compare against, e.g. the display name for the facet
 * @param searchTerm - The term being searched for, e.g. the searchable facets query
 * @returns Whether a similar substring exists
 */
export declare function isLevenshteinMatch(value: string, searchTerm: string): boolean;
/**
 * Given some string value, returns the Levenshtein distance for the substring
 * that is of the same length and is "closest" to the given searchTerm.
 *
 * @param value - The string to compare against, e.g. the display name for the facet
 * @param searchTerm - The term being searched for, e.g. the searchable facets query
 * @returns The shortest Levenshtein distance between a substring of the value and the searchTerm
 */
export declare function getBestLevenshteinDistance(value: string, searchTerm: string): number;
//# sourceMappingURL=searchable-facets.d.ts.map