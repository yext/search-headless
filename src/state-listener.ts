import { State } from './types/state';

export default interface StateListener<T> {
  valueAccessor(state: State): T;
  callback(currentValue: T);
}