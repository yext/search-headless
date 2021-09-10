import {
  AnswersCore,
  QueryTrigger,
  QuerySource,
  QuestionSubmissionRequest,
  Filter,
  CombinedFilter,
  AutocompleteResponse,
  VerticalSearchResponse,
  UniversalSearchResponse,
  QuestionSubmissionResponse,
  VerticalResults,
  FacetOption,
  DisplayableFacet,
  SortBy,
  Context,
} from '@yext/answers-core';

import StateListener from './models/state-listener';
import { State } from './models/state';
import StateManager from './models/state-manager';
import { Unsubscribe } from '@reduxjs/toolkit';
import { isLevenshteinMatch } from './utils/searchable-facets';

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

  setLimit(limit: number): void {
    this.stateManager.dispatchEvent('vertical/setLimit', limit);
  }

  setOffset(offset: number): void {
    this.stateManager.dispatchEvent('vertical/setOffset', offset);
  }

  setFilter(filter: Filter | CombinedFilter | null): void {
    this.stateManager.dispatchEvent('filters/setStatic', filter);
  }

  setSpellCheckEnabled(enabled: boolean): void {
    this.stateManager.dispatchEvent('spellCheck/setEnabled', enabled);
  }

  setAlternativeVerticals(alternativeVerticals: VerticalResults[]): void {
    this.stateManager.dispatchEvent('vertical/setAlternativeVerticals', alternativeVerticals);
  }

  setContext(context: Context): void {
    this.stateManager.dispatchEvent('meta/setContext', context);
  }

  setReferrerPageUrl(referrerPageUrl: string): void {
    this.stateManager.dispatchEvent('meta/setReferrerPageUrl', referrerPageUrl);
  }

  setState(state: State): void {
    this.stateManager.dispatchEvent('set-state', state);
  }

  get state(): State {
    return this.stateManager.getState();
  }

  addListener<T>(listener: StateListener<T>): Unsubscribe {
    return this.stateManager.addListener<T>(listener);
  }

  async submitQuestion(request: QuestionSubmissionRequest): Promise<QuestionSubmissionResponse> {
    return this.core.submitQuestion(request);
  }

  async executeUniversalQuery(): Promise<UniversalSearchResponse | undefined> {
    const { query, querySource, queryTrigger } = this.state.query;
    const skipSpellCheck = !this.state.spellCheck.enabled;
    const { referrerPageUrl, context } = this.state.meta;

    if (query) {
      const results = await this.core.universalSearch({
        query: query,
        querySource: querySource,
        queryTrigger: queryTrigger,
        skipSpellCheck: skipSpellCheck,
        context,
        referrerPageUrl
      });

      this.stateManager.dispatchEvent('universal/setResults', results);
      this.stateManager.dispatchEvent('query/setQueryId', results.queryId);
      this.stateManager.dispatchEvent('query/setLatest', query);
      this.stateManager.dispatchEvent('spellCheck/setResult', results.spellCheck);
      return results;
    }
  }

  async executeUniversalAutoComplete(): Promise<AutocompleteResponse | undefined> {
    const query = this.state.query.query || '';
    const results = await this.core.universalAutocomplete({
      input: query
    });

    this.stateManager.dispatchEvent('universal/setAutoComplete', results);
    return results;
  }

  async executeVerticalQuery(): Promise<VerticalSearchResponse | undefined> {
    const verticalKey = this.state.vertical.key;
    if (!verticalKey) {
      console.error('no verticalKey supplied for vertical search');
      return;
    }
    const { query, querySource, queryTrigger } = this.state.query;
    const skipSpellCheck = !this.state.spellCheck.enabled;
    const staticFilters = this.state.filters.static || undefined;
    const facets = this.state.filters?.facets;
    const limit = this.state.vertical.limit;
    const offset = this.state.vertical.offset;
    const sortBys = this.state.filters?.sortBys;
    const { referrerPageUrl, context } = this.state.meta;

    const facetsToApply = facets?.map(facet => {
      return {
        fieldId: facet.fieldId,
        options: facet.options.filter(o => o.selected)
      };
    });

    if (query) {
      const request = {
        query,
        querySource: querySource,
        queryTrigger: queryTrigger,
        verticalKey: verticalKey,
        staticFilters,
        facets: facetsToApply,
        retrieveFacets: true,
        limit: limit,
        offset: offset,
        skipSpellCheck: skipSpellCheck,
        sortBys,
        context,
        referrerPageUrl
      };
      const results = await this.core.verticalSearch(request);
      this.stateManager.dispatchEvent('vertical/setResults', results);
      this.stateManager.dispatchEvent('query/setQueryId', results.queryId);
      this.stateManager.dispatchEvent('query/setLatest', query);
      this.stateManager.dispatchEvent('filters/setFacets', results.facets);
      this.stateManager.dispatchEvent('spellCheck/setResult', results.spellCheck);
      this.stateManager.dispatchEvent('vertical/setAlternativeVerticals', results.alternativeVerticals);
      return results;
    }
  }

  async executeVerticalAutoComplete(): Promise<AutocompleteResponse | undefined> {
    const query = this.state.query.query || '';
    const verticalKey = this.state.vertical.key;
    if (!verticalKey) {
      console.error('no verticalKey supplied for vertical autocomplete');
      return;
    }

    const results = await this.core.verticalAutocomplete({
      input: query,
      verticalKey: verticalKey
    });

    this.stateManager.dispatchEvent('vertical/setAutoComplete', results);
    return results;
  }

  selectFacetOption(fieldId: string, facetOption: FacetOption): void {
    const payload = {
      shouldSelect: true,
      fieldId,
      facetOption
    };
    this.stateManager.dispatchEvent('filters/toggleFacetOption', payload);
  }

  unselectFacetOption(fieldId: string, facetOption: FacetOption): void {
    const payload = {
      shouldSelect: false,
      fieldId,
      facetOption
    };
    this.stateManager.dispatchEvent('filters/toggleFacetOption', payload);
  }

  searchThroughFacet(facet: DisplayableFacet, searchTerm: string): DisplayableFacet {
    return {
      ...facet,
      options: facet.options.filter(o => isLevenshteinMatch(o.displayName, searchTerm))
    };
  }

  setSortBys(sortBys: SortBy[]): void {
    this.stateManager.dispatchEvent('filters/setSortBys', sortBys);
  }
}

