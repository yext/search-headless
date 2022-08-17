/**
 * A boundary for a {@link BoundedRange} of type T.
 *
 * @public
 */
export interface RangeBoundary<T> {
    /**
     * The value of the boundary.
     */
    value: T;
    /**
     * Whether or not the range includes the boundary value.
     */
    inclusive: boolean;
}
/**
 * An interface representing a range of values of type T.
 *
 * @public
 */
export interface BoundedRange<T> {
    /**
     * The minimum value bounding the range.
     */
    min?: RangeBoundary<T>;
    /**
     * The maximum value bounding the range.
     */
    max?: RangeBoundary<T>;
}
//# sourceMappingURL=boundedrange.d.ts.map