import { EnumOrLiteral } from '../../utils/types';

export enum SearchTypeEnum {
  Universal = 'universal',
  Vertical = 'vertical'
}

export type SearchType = EnumOrLiteral<SearchTypeEnum>;