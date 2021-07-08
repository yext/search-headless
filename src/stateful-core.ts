import { AnswersCore, QueryTrigger, QuerySource, QuestionSubmissionRequest, Filter, CombinedFilter } from '@yext/answers-core';
import StateListener from './models/state-listener';
import { State } from './models/state';
import StateManager from './models/state-manager';

export default class StatefulCore {
  constructor(private core: AnswersCore, private stateManager: StateManager) {}

  setQuery(query: string): void {
    this.stateManager.dispatchEvent('query/set', query);
  }

  setQueryTrigger(trigger: QueryTrigger): void {
    this.stateManager.dispatchEvent('query/setTrigger', trigger);
  }

  setQuerySource(source: QuerySource): void {
    this.stateManager.dispatchEvent('query/setSource', source);
  }

  setVerticalKey(key: string): void {
    this.stateManager.dispatchEvent('vertical/setKey', key);
  }

  setFilter(filter: Filter | CombinedFilter): void {
    this.stateManager.dispatchEvent('filters/setStatic', filter);
  }

  setState(state: State): void {
    this.stateManager.dispatchEvent('set-state', state);
  }

  get state(): State {
    return this.stateManager.getState();
  }

  addListener<T>(listener: StateListener<T>): void {
    this.stateManager.addListener<T>(listener);
  }

  async submitQuestion(request: QuestionSubmissionRequest) {
    await this.core.submitQuestion(request);
  }

  async executeUniversalQuery() {
    const { query, querySource, queryTrigger } = this.state.query;
    if (query) {
      const results = await this.core.universalSearch({
        query: query,
        querySource: querySource,
        queryTrigger: queryTrigger,
      });

      this.stateManager.dispatchEvent('universal/setResults', results);
      this.stateManager.dispatchEvent('query/setQueryId', results.queryId);
    }
  }

  async executeUniversalAutoComplete() {
    const query = this.state.query.query;
    if (query) {
      const results = await this.core.universalAutocomplete({
        input: query
      });

      this.stateManager.dispatchEvent('universal/setAutoComplete', results);
    }
  }

  async executeVerticalQuery() {
    const { query, querySource, queryTrigger } = this.state.query;
    const staticFilters = this.state.filters.static;
    const verticalKey = this.state.vertical.key;

    if (query && verticalKey) {
      const results = await this.core.verticalSearch({
        query,
        querySource: querySource,
        queryTrigger: queryTrigger,
        verticalKey: verticalKey,
        staticFilters,
        retrieveFacets: true
      });

      this.stateManager.dispatchEvent('vertical/setResults', results);
      this.stateManager.dispatchEvent('query/setQueryId', results.queryId);
    }
  }

  async executeVerticalAutoComplete() {
    const query = this.state.query.query;
    const verticalKey = this.state.vertical.key;

    if (query && verticalKey) {
      const results = await this.core.verticalAutocomplete({
        input: query,
        verticalKey: verticalKey
      });

      this.stateManager.dispatchEvent('vertical/setAutoComplete', results);
    }
  }
}

