export interface RangeBoundary<T> {
  value: T,
  inclusive: boolean
}

export interface Range<T> {
  min?: RangeBoundary<T>,
  max?: RangeBoundary<T>
}