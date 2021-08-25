import { DisplayableFacet, DisplayableFacetOption } from '@yext/answers-core';

/**
 * A HighlightableFacet is a DisplayableFacet that overrides `options` to
 * additionally allow highlighted substrings.
 */
export interface HighlightableFacet extends DisplayableFacet {
  options: HighlightableFacetOption[]
}

/**
 * A HighlightableFacetOption is a DisplayableFacetOption that optionally
 * allows for a highlighted substring.
 */
export interface HighlightableFacetOption extends DisplayableFacetOption {
  highlightedSubstring?: {
    offset: number
    length: number
  }
}