import { CombinedFilter, Filter, FilterCombinator, NearFilterValue } from '@yext/answers-core';
import { BoundedRange } from '../models/utils/boundedrange';
/**
 * A union type for the different kinds of filter.
 *
 * @public
 */
export declare type FilterTypes = Filter | CombinedFilter;
/**
 * Creates a simple {@link Filter} that ensures all results will match a specific
 * field value.
 *
 * @param fieldId - The comparison field's identifier
 * @param value - The value to match
 * @returns The newly created {@link Filter} for the field value
 *
 * @public
 */
export declare function createEqualsFilter(fieldId: string, value: string | number | boolean): Filter;
/**
 * Creates a {@link Filter} or {@link CombinedFilter} that matches all results where the
 * given field value falls in a specific number {@link BoundedRange}.
 *
 * @param fieldId - The comparison field's identifier
 * @param range - The acceptable number range
 * @returns The newly created filter for the field value range
 *
 * @public
 */
export declare function createNumberRangeFilter(fieldId: string, range: BoundedRange<number>): FilterTypes;
/**
 * Creates a {@link Filter} or {@link CombinedFilter} that matches all results where the
 * given field value falls in a specific Date {@link BoundedRange}.
 *
 * @param fieldId - The comparison field's identifier
 * @param range - The acceptable date range
 * @returns The newly created filter for the field value range
 *
 * @public
 */
export declare function createDateRangeFilter(fieldId: string, range: BoundedRange<Date>): FilterTypes;
/**
 * Creates a {@link Filter} that matches all results within a certain radius of the
 * given position.
 *
 * @param position - The position and radius
 * @returns The newly created {@link Filter} for the radius of the position
 *
 * @public
 */
export declare function createNearMeFilter(position: NearFilterValue): Filter;
/**
 * Creates a {@link CombinedFilter} by applying the specified {@link FilterCombinator}
 * to the two filters.
 *
 * @param filterA - The first filter to be combined
 * @param filterB - The second filter to be combined
 * @param combinator - Specifies how the two filters should be joined
 * @returns The newly created {@link CombinedFilter}
 *
 * @public
 */
export declare function combineFilters(filterA: FilterTypes, filterB: FilterTypes, combinator: FilterCombinator): CombinedFilter;
//# sourceMappingURL=filter-creators.d.ts.map