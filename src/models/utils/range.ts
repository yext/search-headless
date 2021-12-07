/**
 * A boundary for a {@link Range} of type T.
 */
export interface RangeBoundary<T> {
  /**
   * The value of the boundary.
   */
  value: T,
  /**
   * Whether the range includes the boundary value or not.
   */
  inclusive: boolean
}

/**
 * An interface representing a range of values of type T.
 */
export interface Range<T> {
  /**
   * The minimum value bounding the range.
   */
  min?: RangeBoundary<T>,
  /**
   * The maximum value bounding the range.
   */
  max?: RangeBoundary<T>
}