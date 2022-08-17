"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCloseMatch = exports.searchThroughFacet = void 0;
const searchable_facets_1 = require("./utils/searchable-facets");
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
function searchThroughFacet(facet, searchTerm) {
    return Object.assign(Object.assign({}, facet), { options: facet.options.filter(o => isCloseMatch(o.displayName, searchTerm)) });
}
exports.searchThroughFacet = searchThroughFacet;
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
function isCloseMatch(value, searchTerm) {
    return (0, searchable_facets_1.isLevenshteinMatch)(value.toLowerCase(), searchTerm.toLowerCase());
}
exports.isCloseMatch = isCloseMatch;
//# sourceMappingURL=answers-utilities.js.map