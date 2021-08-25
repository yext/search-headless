import {
  getBestLevenshteinMatch,
  calculateHighlightedSubstring
} from '../../../src/utils/searchable-facets';

it('can find the best levenshtein match', () => {
  const [bestDistance, bestMatch] = getBestLevenshteinMatch('generation', 'cation');
  expect(bestDistance).toEqual(1);
  expect(bestMatch).toEqual('ration');
});

describe('calculateHighlightedSubstring', () => {
  it('if the search term is an exact substring, return that substring', () => {
    const match = calculateHighlightedSubstring('generation', 'ra');
    expect(match).toEqual({
      offset: 4,
      length: 2
    });
  });

  it('does not try levenshtein matching if the searchTerm\s length is < 3', () => {
    const match = calculateHighlightedSubstring('generation', 'gn');
    expect(match).toEqual(undefined);
  });

  it('does levenshtein matching to find the best substring', () => {
    const match = calculateHighlightedSubstring('generation', 'rti');
    expect(match).toEqual({
      offset: 5,
      length: 3
    });
  });
});