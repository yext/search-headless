import { useEffect, useState} from 'react';
import { State } from '../models/state';
import { useAnswersActions } from './useAnswersActions';

type StateMapper<T> = (s: State) => T;

/**
 * Returns the Answers State returned by the map function
 */
export function useAnswersState<T>(mapState: StateMapper<T>): T | undefined {
  const [stateValue, setState] = useState(undefined as undefined | T);
  const answersActions = useAnswersActions();

  useEffect(() => {
    return answersActions.addListener({
      valueAccessor: mapState,
      callback: (stateValue: T) => setState(stateValue)
    });
  });

  return stateValue;
}