import {
  getBestLevenshteinDistance,
  isLevenshteinMatch
} from '../../../src/utils/searchable-facets';

it('can find the best levenshtein match', () => {
  const bestDistance = getBestLevenshteinDistance('generation', 'cation');
  expect(bestDistance).toEqual(1);
});

describe('isLevenshteinMatch', () => {
  it('if the search term is an exact substring, return that substring', () => {
    const isMatch = isLevenshteinMatch('generation', 'ra');
    expect(isMatch).toBeTruthy();
  });

  it('does not try levenshtein matching if the searchTerm\s length is < 3', () => {
    const isMatch = isLevenshteinMatch('generation', 'gn');
    expect(isMatch).toBeFalsy();
  });

  it('does levenshtein matching correctly', () => {
    const isMatch = getBestLevenshteinDistance('generation', 'rti');
    expect(isMatch).toBeTruthy();
  });
});