import { UniversalLimit, VerticalResults } from '@yext/answers-core';
/**
 * Maintains the data for the latest universal search.
 *
 * @public
 */
export interface UniversalSearchState {
    /**
     * An object defining the limit (up to how many results should be returned) for
     * each vertical.
     */
    limit?: UniversalLimit;
    /**
     * The results from each vertical included in the universal search.
     */
    verticals?: VerticalResults[];
    /**
     * If included, the verticals to which the universal search should be restricted.
     */
    restrictVerticals?: string[];
}
//# sourceMappingURL=universal.d.ts.map