import levenshtein from 'js-levenshtein';

type HighlightedSubstring = {
  length: number
  offset: number
};

/**
 * Given some displayName, search for its "best" substring match, if one exists that fulfills
 * the maxLevenshteinDistance.
 *
 * @param displayName The display name for the facet
 * @param searchTerm The term being searched for e.g. the searchable facets query
 * @returns the closest substring match, if one exists
 */
export function calculateHighlightedSubstring(
  displayName: string,
  searchTerm: string
): HighlightedSubstring | undefined {
  // The min search length to try levenshtein matching
  const minLevenshteinSearchLength = 3;
  // The maximum levenshtein distance to be considered a match
  const maxLevenshteinDistance = 1;
  let offset = getOffset(displayName, searchTerm);
  if (offset > -1) {
    return {
      length: searchTerm.length,
      offset: offset
    };
  }
  if (searchTerm.length < minLevenshteinSearchLength) {
    return;
  }
  const [bestDistance, bestSubstring] = getBestLevenshteinMatch(displayName, searchTerm);
  // If the min levenshtein distance is below the max, count it as a match
  if (bestDistance <= maxLevenshteinDistance) {
    offset = getOffset(displayName, bestSubstring);
    if (offset < 0) {
      return;
    }

    return {
      length: searchTerm.length,
      offset
    };
  }
}

/**
 * Finds the "best" substring of displayName, i.e. the one that is the
 * closest match to the given searchTerm based on their levenshtein distance.
 *
 * @param displayName
 * @param searchTerm
 * @returns The matched substring and its levenshtein distance
 */
export function getBestLevenshteinMatch(
  displayName: string,
  searchTerm: string,
): [bestDistance: number, bestSubstring: string] {
  // All contiguous substrings of displayName, of length equal to the search term's
  const substrings: string[] = [];
  for (let start = 0; start <= displayName.length - searchTerm.length; start++) {
    substrings.push(displayName.substr(start, searchTerm.length));
  }
  // Find the substring that is the closest in levenshtein distance to filter
  let bestDistance = searchTerm.length;
  let bestSubstring = searchTerm;
  for (const substring of substrings) {
    const levDist = levenshtein(substring, searchTerm);
    if (levDist < bestDistance) {
      bestDistance = levDist;
      bestSubstring = substring;
    }
  }
  return [bestDistance, bestSubstring];
}

function getOffset(displayName: string, searchTerm: string) {
  return (displayName && searchTerm) ? displayName.indexOf(searchTerm) : -1;
}