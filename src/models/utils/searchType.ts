import { EnumOrLiteral } from '../../utils/types';

/**
 * Indicates the type of search that headless is managing.
 *
 * @public
 */
export enum SearchTypeEnum {
  /**
   * Indicates that headless is managing universal search.
   */
  Universal = 'universal',
  /**
   * Indicates that headless is managing vertical search.
   */
  Vertical = 'vertical'
}

export type SearchType = EnumOrLiteral<SearchTypeEnum>;