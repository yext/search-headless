import { AnswersCore, VerticalSearchResponse, Facet, QueryTrigger, QuerySource, UniversalSearchResponse, QuestionSubmissionRequest } from '@yext/answers-core';
import StateListener from './state-listener';
import StateManager from './state-manager';

export default class StatefulCore {
  constructor(private core: AnswersCore, private stateManager: StateManager) {}

  setQuery(query: string) {
    this.stateManager.dispatchEvent('query/set', query);
  }

  get query(): string {
    return this.state.query.query;
  }

  setQueryTrigger(trigger: QueryTrigger) {
    this.stateManager.dispatchEvent('query/setTrigger', trigger);
  }

  get queryTrigger(): QueryTrigger {
    return this.state.querytrigger;
  }

  setQuerySource(source: QuerySource) {
    this.stateManager.dispatchEvent('query/setSource', source);
  }

  get querySource(): QuerySource {
    return this.state.querySource;
  }

  setVerticalKey(key: string) {
    this.stateManager.dispatchEvent('vertical/setKey', key);
  }

  get verticalKey(): string {
    return this.state.vertical.key;
  }

  get verticalResults(): VerticalSearchResponse {
    return this.state.vertical.results;
  }

  get facets(): Facet[] {
    return this.state.vertical.facets;
  }

  get universalResults(): UniversalSearchResponse {
    return this.state.universal.results;
  }

  getQueryId(): string {
    return this.state.query.queryId;
  }

  setState(state) {
    this.stateManager.dispatchEvent('set-state', state);
  }

  get state(): any {
    return this.stateManager.getState();
  }

  addListener<T>(listener: StateListener<T>) {
    this.stateManager.addListener<T>(listener);
  }

  async submitQuestion(request: QuestionSubmissionRequest) {
    const response = await this.core.submitQuestion(request);
  }

  async executeUniversalQuery() {
    const results = await this.core.universalSearch({ 
      query: this.query,
      querySource: this.querySource,
      queryTrigger: this.queryTrigger,
    });

    this.stateManager.dispatchEvent('universal/setResults', results);
    this.stateManager.dispatchEvent('query/setQueryId', results.queryId);
  }

  async executeUniversalAutoComplete() {
    const results = await this.core.universalAutocomplete({
      input: this.query
    });
    
    this.stateManager.dispatchEvent('universal/setAutoComplete', results);
  }

  async executeVerticalQuery() {
    const results = await this.core.verticalSearch({ 
      query: this.query,
      querySource: this.querySource,
      queryTrigger: this.queryTrigger,
      verticalKey: this.verticalKey,
      retrieveFacets: true
    });
    
    this.stateManager.dispatchEvent('vertical/setResults', results);
    this.stateManager.dispatchEvent('query/setQueryId', results.queryId);
  }

  async executeVerticalAutoComplete() {
    const results = await this.core.verticalAutocomplete({
      input: this.query,
      verticalKey: this.verticalKey
    });

    this.stateManager.dispatchEvent('vertical/setAutoComplete', results);
  }
}

