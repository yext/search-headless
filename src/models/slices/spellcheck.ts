import { SpellCheck } from '@yext/answers-core';

/**
 * The state for spellcheck.
 */
export interface SpellCheckState extends Partial<SpellCheck> {
  /**
   * Whether spellcheck is enabled or not.
   */
  enabled: boolean
}