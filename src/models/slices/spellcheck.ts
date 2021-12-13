import { SpellCheck } from '@yext/answers-core';

/**
 * Maintains whether spellcheck is enabled and the spellcheck response from the
 * latest search.
 *
 * @public
 */
export interface SpellCheckState extends Partial<SpellCheck> {
  /**
   * Whether or not spellcheck is enabled.
   */
  enabled: boolean
}