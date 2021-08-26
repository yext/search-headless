import levenshtein from 'js-levenshtein';

/**
 * Given some value, determine whether it contains a "similar enough" match for the given searchTerm.
 *
 * @param value The display name for the facet
 * @param searchTerm The term being searched for e.g. the searchable facets query
 * @returns the closest substring match, if one exists
 */
export function isLevenshteinMatch(
  value: string,
  searchTerm: string
): boolean {
  if (value.includes(searchTerm)) {
    return true;
  }

  // The min search length to try levenshtein matching
  const minLevenshteinSearchLength = 3;
  if (searchTerm.length < minLevenshteinSearchLength) {
    return false;
  }
  const bestDistance = getBestLevenshteinDistance(value, searchTerm);

  // The maximum levenshtein distance to be considered a match
  const maxLevenshteinDistance = 1;
  // If the min levenshtein distance is below the max, count it as a match
  if (bestDistance <= maxLevenshteinDistance) {
    return true;
  }
  return false;
}

/**
 * Given some string value, return the levenshtein distance for the substring,
 * of same length, that is the "closest" to the given searchTerm.
 *
 * @param value
 * @param searchTerm
 * @returns The matched substring and its levenshtein distance
 */
export function getBestLevenshteinDistance(
  value: string,
  searchTerm: string,
): number {
  // All contiguous substrings of value, of length equal to the search term's
  const substrings: string[] = [];
  for (let start = 0; start <= value.length - searchTerm.length; start++) {
    substrings.push(value.substr(start, searchTerm.length));
  }
  // Find the substring that is the closest in levenshtein distance to filter
  let bestDistance = searchTerm.length;
  for (const substring of substrings) {
    const levDist = levenshtein(substring, searchTerm);
    if (levDist < bestDistance) {
      bestDistance = levDist;
    }
  }
  return bestDistance;
}
