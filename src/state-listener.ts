export default interface StateListener<T> {
  valueAccessor(state): T;
  callback(currentValue: T);
}