import { CombinedFilter, Filter } from '@yext/answers-core';
import { SelectableFilter } from '../models/utils/selectableFilter';
/**
 * Converts a list of {@link SelectableFilter}s used in Answers Headless
 * to a single nested filter stucture used in Answers Core.
 *
 * @param selectableFilters - The filters to be transformed
 * @returns The filters in a singly-nested {@link CombinedFilter}, or if there
 *          is only one filter in the list and it is selected, returns that
 *          {@link Filter}
 */
export declare function transformFiltersToCoreFormat(selectableFilters: SelectableFilter[] | undefined): Filter | CombinedFilter | null;
//# sourceMappingURL=transform-filters.d.ts.map