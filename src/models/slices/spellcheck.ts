import { SpellCheck } from '@yext/answers-core';

export interface SpellCheckState extends Partial<SpellCheck> {
  enabled: boolean
}