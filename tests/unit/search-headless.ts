import { DisjunctionStaticFilter, FieldValueStaticFilter, FilterCombinator, Matcher, QuerySource, QueryTrigger } from '@yext/search-core';
import HttpManager from '../../src/http-manager';
import StateManager from '../../src/models/state-manager';
import SearchHeadless from '../../src/search-headless';
import { SelectableStaticFilter } from '../../src/models/utils/selectableStaticFilter';
import { State } from '../../src/models/state';
import { SearchTypeEnum } from '../../src/models/utils/searchType';
import { initialState as initialVerticalState } from '../../src/slices/vertical';
import { initialState as initialUniversalState } from '../../src/slices/universal';
import { initialState as initialFiltersState } from '../../src/slices/filters';
import { initialState as initialDirectAnswerState } from '../../src/slices/directanswer';
import { initialState as initialQueryRulesState } from '../../src/slices/queryrules';
import { initialState as initialSearchStatusState } from '../../src/slices/searchstatus';

const mockedState: State = {
  query: {
    input: 'Search',
    querySource: QuerySource.Standard,
    queryTrigger: QueryTrigger.Initialize
  },
  universal: {},
  vertical: {
    verticalKey: 'someKey',
    offset: 0,
    limit: 20
  },
  queryRules: {
    actions: []
  },
  filters: {
    static: [{
      filter: {
        kind: 'fieldValue',
        fieldId: 'c_someField',
        matcher: Matcher.Equals,
        value: 'some value',
      },
      selected: true,
      displayName: 'some display name'
    }, {
      filter: {
        kind: 'disjunction',
        combinator: FilterCombinator.OR,
        filters: [{
          kind: 'fieldValue',
          fieldId: 'c_someField',
          matcher: Matcher.Equals,
          value: 'different value',
        }, {
          kind: 'fieldValue',
          fieldId: 'c_anotherField',
          matcher: Matcher.Equals,
          value: 'another value',
        }],
      },
      selected: true,
      displayName: 'other display name'
    }]
  },
  spellCheck: {
    enabled: true
  },
  sessionTracking: {
    enabled: true,
    sessionId: 'random-id-number'
  },
  meta: {
    searchType: SearchTypeEnum.Vertical
  },
  location: {},
  directAnswer: {},
  searchStatus: {}
};

const mockedStateManager: jest.Mocked<StateManager> = {
  getState: jest.fn(() => mockedState),
  dispatchEvent: jest.fn(),
  addListener: jest.fn()
};

const mockedSearch = jest.fn(() => { return { queryId: '123' }; });
const mockedCore: any = {
  verticalAutocomplete: jest.fn(() => { return {}; }),
  universalAutocomplete: jest.fn(() => { return {}; }),
  universalSearch: mockedSearch,
  verticalSearch: mockedSearch,
  filterSearch: jest.fn(() => Promise.resolve({}))
};

const answers = new SearchHeadless(mockedCore, mockedStateManager, new HttpManager());

describe('setters work as expected', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('setStaticFilters works as expected', () => {
    const filter: SelectableStaticFilter = {
      filter: {
        kind: 'fieldValue',
        fieldId: 'c_someField',
        matcher: Matcher.Equals,
        value: 'someValue',
      },
      selected: true,
      displayName: 'someLabel'
    };
    const staticFilter = [filter];
    answers.setStaticFilters(staticFilter);

    const dispatchEventCalls =
      mockedStateManager.dispatchEvent.mock.calls;

    expect(dispatchEventCalls.length).toBe(1);
    expect(dispatchEventCalls[0][0]).toBe('filters/setStatic');
    expect(dispatchEventCalls[0][1]).toBe(staticFilter);
  });

  it('setFacets works as expected', () => {
    const facets = [
      {
        fieldId: 'someField',
        displayName: 'Some Field',
        options: [{
          matcher: Matcher.Equals,
          value: 'someValue',
          displayName: 'Some Value',
          count: 1,
          selected: true
        }]
      }
    ];
    answers.setFacets(facets);
    const dispatchEventCalls =
      mockedStateManager.dispatchEvent.mock.calls;

    expect(dispatchEventCalls.length).toBe(1);
    expect(dispatchEventCalls[0][0]).toBe('filters/setFacets');
    expect(dispatchEventCalls[0][1]).toBe(facets);
  });

  it('resetFacets works as expected', () => {
    answers.resetFacets();

    const dispatchEventCalls =
      mockedStateManager.dispatchEvent.mock.calls;

    expect(dispatchEventCalls.length).toBe(1);
    expect(dispatchEventCalls[0][0]).toBe('filters/resetFacets');
  });

  it('setSessionTrackingEnabled works as expected', () => {
    answers.setSessionTrackingEnabled(true);

    const dispatchEventCalls =
      mockedStateManager.dispatchEvent.mock.calls;

    expect(dispatchEventCalls.length).toBe(1);
    expect(dispatchEventCalls[0][0]).toBe('sessionTracking/setEnabled');
    expect(dispatchEventCalls[0][1]).toBe(true);
  });

  it('setSessionId works as expected', () => {
    answers.setSessionId('random-id-number');

    const dispatchEventCalls =
      mockedStateManager.dispatchEvent.mock.calls;

    expect(dispatchEventCalls.length).toBe(1);
    expect(dispatchEventCalls[0][0]).toBe('sessionTracking/setSessionId');
    expect(dispatchEventCalls[0][1]).toBe('random-id-number');
  });

  it('setQuery works as expected', () => {
    const query = 'Hello';
    answers.setQuery(query);

    const dispatchEventCalls =
      mockedStateManager.dispatchEvent.mock.calls;

    expect(dispatchEventCalls.length).toBe(1);
    expect(dispatchEventCalls[0][0]).toBe('query/setInput');
    expect(dispatchEventCalls[0][1]).toBe(query);
  });

  it('setQueryTrigger works as expected', () => {
    answers.setQueryTrigger(QueryTrigger.Initialize);

    const dispatchEventCalls =
      mockedStateManager.dispatchEvent.mock.calls;

    expect(dispatchEventCalls.length).toBe(1);
    expect(dispatchEventCalls[0][0]).toBe('query/setTrigger');
    expect(dispatchEventCalls[0][1]).toBe(QueryTrigger.Initialize);
  });

  it('setQuerySource works as expected', () => {
    answers.setQuerySource(QuerySource.Overlay);

    const dispatchEventCalls =
      mockedStateManager.dispatchEvent.mock.calls;

    expect(dispatchEventCalls.length).toBe(1);
    expect(dispatchEventCalls[0][0]).toBe('query/setSource');
    expect(dispatchEventCalls[0][1]).toBe(QuerySource.Overlay);
  });

  it('setVertical works as expected', () => {
    const verticalKey = 'key';
    answers.setVertical(verticalKey);

    const dispatchEventCalls =
      mockedStateManager.dispatchEvent.mock.calls;

    expect(dispatchEventCalls.length).toBe(3);
    expect(dispatchEventCalls[0][0]).toBe('set-state');
    expect(dispatchEventCalls[0][1]).toStrictEqual({
      ...answers.state,
      directAnswer: initialDirectAnswerState,
      filters: initialFiltersState,
      queryRules: initialQueryRulesState,
      searchStatus: initialSearchStatusState,
      vertical: initialVerticalState,
      universal: initialUniversalState
    });
    expect(dispatchEventCalls[1][0]).toBe('vertical/setVerticalKey');
    expect(dispatchEventCalls[1][1]).toBe(verticalKey);
    expect(dispatchEventCalls[2][0]).toBe('meta/setSearchType');
    expect(dispatchEventCalls[2][1]).toBe(SearchTypeEnum.Vertical);
  });

  it('setUniversal works as expected', () => {
    answers.setUniversal();

    const dispatchEventCalls =
      mockedStateManager.dispatchEvent.mock.calls;

    expect(dispatchEventCalls.length).toBe(3);
    expect(dispatchEventCalls[0][0]).toBe('set-state');
    expect(dispatchEventCalls[0][1]).toStrictEqual({
      ...answers.state,
      directAnswer: initialDirectAnswerState,
      filters: initialFiltersState,
      queryRules: initialQueryRulesState,
      searchStatus: initialSearchStatusState,
      vertical: initialVerticalState,
      universal: initialUniversalState
    });
    expect(dispatchEventCalls[1][0]).toBe('vertical/setVerticalKey');
    expect(dispatchEventCalls[1][1]).toBe(undefined);
    expect(dispatchEventCalls[2][0]).toBe('meta/setSearchType');
    expect(dispatchEventCalls[2][1]).toBe(SearchTypeEnum.Universal);
  });

  it('setState works as expected', () => {
    const state: any = { query: {} };
    answers.setState(state);

    const dispatchEventCalls =
      mockedStateManager.dispatchEvent.mock.calls;

    expect(dispatchEventCalls.length).toBe(1);
    expect(dispatchEventCalls[0][0]).toBe('set-state');
    expect(dispatchEventCalls[0][1]).toBe(state);
  });

  it('setVerticalLimit works as expected', () => {
    const limit = 12;
    answers.setVerticalLimit(limit);

    const dispatchEventCalls =
      mockedStateManager.dispatchEvent.mock.calls;

    expect(dispatchEventCalls.length).toBe(1);
    expect(dispatchEventCalls[0][0]).toBe('vertical/setLimit');
    expect(dispatchEventCalls[0][1]).toBe(limit);
  });

  it('setUniversalLimit works as expected', () => {
    const limit = {
      people: 10,
      faqs: 5
    };
    answers.setUniversalLimit(limit);

    const dispatchEventCalls =
      mockedStateManager.dispatchEvent.mock.calls;

    expect(dispatchEventCalls.length).toBe(1);
    expect(dispatchEventCalls[0][0]).toBe('universal/setLimit');
    expect(dispatchEventCalls[0][1]).toBe(limit);
  });

  it('setOffset works as expected', () => {
    const offset = 12;
    answers.setOffset(offset);

    const dispatchEventCalls =
      mockedStateManager.dispatchEvent.mock.calls;

    expect(dispatchEventCalls.length).toBe(1);
    expect(dispatchEventCalls[0][0]).toBe('vertical/setOffset');
    expect(dispatchEventCalls[0][1]).toBe(offset);
  });
});

describe('filter functions work as expected', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('setFilterOption works', async () => {
    const filter: SelectableStaticFilter = {
      filter: {
        kind: 'fieldValue',
        fieldId: 'c_someField',
        matcher: Matcher.Equals,
        value: 'someValue'
      },
      displayName: 'someLabel',
      selected: true
    };
    answers.setFilterOption(filter);
    const dispatchEventCalls =
    mockedStateManager.dispatchEvent.mock.calls;
    expect(dispatchEventCalls.length).toBe(1);
    expect(dispatchEventCalls[0][0]).toBe('filters/setFilterOption');
    expect(dispatchEventCalls[0][1]).toEqual(filter);
  });
});

describe('auto-complete works as expected', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('vertical auto-complete works', async () => {
    await answers.executeVerticalAutocomplete();

    const coreCalls = mockedCore.verticalAutocomplete.mock.calls;
    expect(coreCalls.length).toBe(1);
    expect(coreCalls[0][0]).toEqual(
      { input: mockedState.query.input, verticalKey: mockedState.vertical.verticalKey });
  });

  it('universal auto-complete works', async () => {
    await answers.executeUniversalAutocomplete();

    const coreCalls = mockedCore.universalAutocomplete.mock.calls;
    expect(coreCalls.length).toBe(1);
    expect(coreCalls[0][0]).toEqual({ input: mockedState.query.input });
  });
});

describe('search works as expected', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('universal search works', async () => {
    answers.state.meta.searchType = SearchTypeEnum.Universal;
    await answers.executeUniversalQuery();

    const coreCalls = mockedCore.universalSearch.mock.calls;
    expect(coreCalls.length).toBe(1);
    expect(coreCalls[0][0]).toEqual({
      query: mockedState.query.input,
      querySource: mockedState.query.querySource,
      queryTrigger: mockedState.query.queryTrigger,
      skipSpellCheck: !mockedState.spellCheck.enabled,
      sessionId: mockedState.sessionTracking.sessionId,
      sessionTrackingEnabled: mockedState.sessionTracking.enabled
    });
  });

  it('vertical search works', async () => {
    answers.state.meta.searchType = SearchTypeEnum.Vertical;
    await answers.executeVerticalQuery();
    const { kind, fieldId, matcher, value } = mockedState.filters.static[0].filter as FieldValueStaticFilter;
    const {
      kind: disjunctionKind,
      combinator,
      filters
    } = mockedState.filters.static[1].filter as DisjunctionStaticFilter;
    const coreCalls = mockedCore.verticalSearch.mock.calls;
    const expectedSearchParams = {
      query: mockedState.query.input,
      querySource: mockedState.query.querySource,
      queryTrigger: mockedState.query.queryTrigger,
      verticalKey: mockedState.vertical.verticalKey,
      staticFilter: {
        kind: 'conjunction',
        combinator: FilterCombinator.AND,
        filters: [
          { kind, fieldId, matcher, value },
          { kind: disjunctionKind, combinator, filters }
        ]
      },
      retrieveFacets: true,
      limit: mockedState.vertical.limit,
      offset: mockedState.vertical.offset,
      skipSpellCheck: !mockedState.spellCheck.enabled,
      sessionId: mockedState.sessionTracking.sessionId,
      sessionTrackingEnabled: mockedState.sessionTracking.enabled
    };
    expect(coreCalls.length).toBe(1);
    expect(coreCalls[0][0]).toEqual(expectedSearchParams);
  });

  it('filter search works', async () => {
    const fields = [
      {
        fieldApiName: 'builtin.location',
        entityType: 'ce_person',
        fetchEntities: false
      }
    ];
    answers.state.meta.searchType = SearchTypeEnum.Vertical;
    await answers.executeFilterSearch('someInput', false, fields);

    expect(mockedCore.filterSearch).toHaveBeenCalledTimes(1);
    expect(mockedCore.filterSearch).toHaveBeenCalledWith({
      input: 'someInput',
      verticalKey: 'someKey',
      sessionTrackingEnabled: true,
      sectioned: false,
      fields
    });
  });
});