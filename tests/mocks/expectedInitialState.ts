import { State } from '../../src/models/state';

export const expectedInitialState: State = {
  filters: {},
  location: {},
  meta: {},
  query: {},
  sessionTracking: {
    enabled: false
  },
  spellCheck: {
    enabled: true
  },
  searchStatus: {},
  universal: {},
  vertical: {},
  directAnswer: {}
};