import { State } from '../../src/models/state';
import { SearchTypeEnum } from '../../src/models/utils/searchType';

export const expectedInitialState: State = {
  filters: {},
  location: {},
  meta: {
    searchType: SearchTypeEnum.Universal
  },
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
  directAnswer: {},
  queryRules: { actions: [] }
};