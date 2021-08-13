import StatefulCore from '../stateful-core';
import { createContext } from 'react';

export type AnswersActions = Omit<StatefulCore, 'state'>;

// The default is empty because we don't know the user's config yet
export const AnswersActionsContext = createContext<AnswersActions>({} as AnswersActions);
