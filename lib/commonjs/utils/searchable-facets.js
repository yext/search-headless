"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBestLevenshteinDistance = exports.isLevenshteinMatch = void 0;
const js_levenshtein_1 = __importDefault(require("js-levenshtein"));
/**
 * Given some value, determines whether it contains a "similar enough" match for the given searchTerm.
 *
 * @param value - The string to compare against, e.g. the display name for the facet
 * @param searchTerm - The term being searched for, e.g. the searchable facets query
 * @returns Whether a similar substring exists
 */
function isLevenshteinMatch(value, searchTerm) {
    if (value.includes(searchTerm)) {
        return true;
    }
    // The min search length to try Levenshtein matching
    const minLevenshteinSearchLength = 3;
    if (searchTerm.length < minLevenshteinSearchLength) {
        return false;
    }
    const bestDistance = getBestLevenshteinDistance(value, searchTerm);
    // The maximum Levenshtein distance to be considered a match
    const maxLevenshteinDistance = 1;
    // If the min Levenshtein distance is at or below the max, count it as a match
    if (bestDistance <= maxLevenshteinDistance) {
        return true;
    }
    return false;
}
exports.isLevenshteinMatch = isLevenshteinMatch;
/**
 * Given some string value, returns the Levenshtein distance for the substring
 * that is of the same length and is "closest" to the given searchTerm.
 *
 * @param value - The string to compare against, e.g. the display name for the facet
 * @param searchTerm - The term being searched for, e.g. the searchable facets query
 * @returns The shortest Levenshtein distance between a substring of the value and the searchTerm
 */
function getBestLevenshteinDistance(value, searchTerm) {
    // All contiguous substrings of value, of length equal to the search term's
    const substrings = [];
    for (let start = 0; start <= value.length - searchTerm.length; start++) {
        substrings.push(value.substr(start, searchTerm.length));
    }
    // Find the substring that is the closest in Levenshtein distance to filter
    let bestDistance = searchTerm.length;
    for (const substring of substrings) {
        const levDist = (0, js_levenshtein_1.default)(substring, searchTerm);
        if (levDist < bestDistance) {
            bestDistance = levDist;
        }
    }
    return bestDistance;
}
exports.getBestLevenshteinDistance = getBestLevenshteinDistance;
//# sourceMappingURL=searchable-facets.js.map