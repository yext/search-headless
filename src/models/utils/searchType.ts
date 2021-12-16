import { EnumOrLiteral } from '../../utils/types';

/**
 * An enum which indicates the type of search that headless is managing.
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

/**
 * An enum and its corresponding string literals which indicate the type of search that headless is managing.
 *
 * @public
 */
export type SearchType = EnumOrLiteral<SearchTypeEnum>;