import { QueryRulesActionsData } from '@yext/answers-core';

/**
 * Maintains the data from the triggered query rules.
 *
 * @public
 */
export interface QueryRulesState {
  /**
   * Any actions triggered by meeting criteria for query rules.
   */
  actions: QueryRulesActionsData[]
}