import { SpellCheck } from '@yext/answers-core';

/**
 * Maintains whether spellcheck is enabled and the spellcheck response from the
 * latest search.
 */
export interface SpellCheckState extends Partial<SpellCheck> {
  /**
   * Whether spellcheck is enabled or not.
   */
  enabled: boolean
}