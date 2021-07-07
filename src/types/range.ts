export interface RangeBoundary {
  value: number,
  inclusive: boolean
}

export interface Range {
  min?: RangeBoundary,
  max?: RangeBoundary
}