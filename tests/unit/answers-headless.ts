import { Matcher, QuerySource, QueryTrigger } from '@yext/answers-core';
import HttpManager from '../../src/http-manager';
import StateManager from '../../src/models/state-manager';
import AnswersHeadless from '../../src/answers-headless';
import { SelectableFilter } from '../../src/models/utils/selectablefilter';

const mockedState = {
  query: {
    query: 'Search',
    querySource: QuerySource.Standard,
    queryTrigger: QueryTrigger.Initialize
  },
  universal: {},
  vertical: {
    key: 'someKey',
    offset: 0,
    limit: 20
  },
  filters: {
    static: {
      someId: [
        {
          fieldId: 'c_someField',
          matcher: Matcher.Equals,
          value: 'some value',
          selected: true
        }
      ]
    }
  },
  spellCheck: {
    enabled: true
  },
  sessionTracking: {
    enabled: true,
    sessionId: 'random-id-number'
  },
  meta: {},
  location: {}
};

const mockedStateManager: jest.Mocked<StateManager> = {
  getState: jest.fn(() => mockedState),
  dispatchEvent: jest.fn(),
  addListener: jest.fn()
};

const mockedSearch = jest.fn(() => { return { queryId: '123' };});
const mockedCore: any = {
  verticalAutocomplete: jest.fn(() => { return {}; }),
  universalAutocomplete: jest.fn(() => { return {}; }),
  universalSearch: mockedSearch,
  verticalSearch: mockedSearch,
  filterSearch: jest.fn(() => Promise.resolve({}))
};

const answers = new AnswersHeadless(mockedCore, mockedStateManager, new HttpManager());

describe('setters work as expected', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('setStaticFilters works as expected', () => {
    const filter: SelectableFilter = {
      fieldId: 'c_someField',
      matcher: Matcher.Equals,
      value: 'someValue',
      selected: true
    };
    const staticFilter = {
      someId: [filter]
    };
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
    expect(dispatchEventCalls[0][0]).toBe('query/set');
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

  it('setVerticalKey works as expected', () => {
    const verticalKey = 'key';
    answers.setVerticalKey(verticalKey);

    const dispatchEventCalls =
      mockedStateManager.dispatchEvent.mock.calls;

    expect(dispatchEventCalls.length).toBe(1);
    expect(dispatchEventCalls[0][0]).toBe('vertical/setKey');
    expect(dispatchEventCalls[0][1]).toBe(verticalKey);
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

  it('setFilterOption works when select filter', async () => {
    const filter = {
      fieldId: 'c_someField',
      matcher: Matcher.Equals,
      value: 'someValue'
    };
    answers.setFilterOption({ ...filter, selected: true }, 'someId');
    const dispatchEventCalls =
    mockedStateManager.dispatchEvent.mock.calls;
    expect(dispatchEventCalls.length).toBe(1);
    expect(dispatchEventCalls[0][0]).toBe('filters/setFilterOption');
    expect(dispatchEventCalls[0][1]).toEqual({
      shouldSelect: true,
      filterCollectionId: 'someId',
      filter: filter
    });
  });

  it('setFilterOption works when unselect filter', async () => {
    const filter = {
      fieldId: 'c_someField',
      matcher: Matcher.Equals,
      value: 'someValue'
    };
    answers.setFilterOption({ ...filter, selected: false }, 'someId');
    const dispatchEventCalls =
    mockedStateManager.dispatchEvent.mock.calls;
    expect(dispatchEventCalls.length).toBe(1);
    expect(dispatchEventCalls[0][0]).toBe('filters/setFilterOption');
    expect(dispatchEventCalls[0][1]).toEqual({
      shouldSelect: false,
      filterCollectionId: 'someId',
      filter: filter
    });
  });
});


describe('auto-complete works as expected', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('vertical auto-complete works', async () => {
    await answers.executeVerticalAutoComplete();

    const coreCalls = mockedCore.verticalAutocomplete.mock.calls;
    expect(coreCalls.length).toBe(1);
    expect(coreCalls[0][0]).toEqual(
      { input: mockedState.query.query, verticalKey: mockedState.vertical.key });
  });

  it('universal auto-complete works', async () => {
    await answers.executeUniversalAutoComplete();

    const coreCalls = mockedCore.universalAutocomplete.mock.calls;
    expect(coreCalls.length).toBe(1);
    expect(coreCalls[0][0]).toEqual({ input: mockedState.query.query });
  });
});

describe('search works as expected', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('universal search works', async () => {
    await answers.executeUniversalQuery();

    const coreCalls = mockedCore.universalSearch.mock.calls;
    expect(coreCalls.length).toBe(1);
    expect(coreCalls[0][0]).toEqual({
      ...mockedState.query,
      skipSpellCheck: !mockedState.spellCheck.enabled,
      sessionId: mockedState.sessionTracking.sessionId,
      sessionTrackingEnabled: mockedState.sessionTracking.enabled
    });
  });

  it('vertical search works', async () => {
    await answers.executeVerticalQuery();
    const { selected:_, ...filter } = mockedState.filters.static.someId[0];
    const coreCalls = mockedCore.verticalSearch.mock.calls;
    const expectedSearchParams = {
      ...mockedState.query,
      verticalKey: mockedState.vertical.key,
      staticFilters: filter,
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