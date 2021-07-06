import { AnswersCore, QueryTrigger, QuerySource, QuestionSubmissionRequest } from '@yext/answers-core';
import StateListener from './types/state-listener';
import { State } from './types/state';
import StateManager from './types/state-manager';

export default class StatefulCore {
  constructor(private core: AnswersCore, private stateManager: StateManager) {}

  setQuery(query: string) {
    this.stateManager.dispatchEvent('query/set', query);
  }

  setQueryTrigger(trigger: QueryTrigger) {
    this.stateManager.dispatchEvent('query/setTrigger', trigger);
  }

  setQuerySource(source: QuerySource) {
    this.stateManager.dispatchEvent('query/setSource', source);
  }

  setVerticalKey(key: string) {
    this.stateManager.dispatchEvent('vertical/setKey', key);
  }

  setState(state: State) {
    this.stateManager.dispatchEvent('set-state', state);
  }

  get state(): State {
    return this.stateManager.getState();
  }

  addListener<T>(listener: StateListener<T>) {
    this.stateManager.addListener<T>(listener);
  }

  async submitQuestion(request: QuestionSubmissionRequest) {
    const response = await this.core.submitQuestion(request);
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
    const verticalKey = this.state.vertical.key;

    if (query && verticalKey) {
      const results = await this.core.verticalSearch({ 
        query: query,
        querySource: querySource,
        queryTrigger: queryTrigger,
        verticalKey: verticalKey,
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

