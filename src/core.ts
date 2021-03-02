import { AnswersCore, VerticalSearchResponse, Facet, QueryTrigger, QuerySource, UniversalSearchResponse } from '@yext/answers-core';
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

  get state(): any {
    return this.stateManager.getState();
  }

  async executeUniversalQuery() {
    const results = await this.core.universalSearch({ 
      query: this.query,
      querySource: this.querySource,
      queryTrigger: this.queryTrigger,
    });

    this.stateManager.dispatchEvent('universal/setResults', results);
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
  }
}

