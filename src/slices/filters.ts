import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Filter, FacetOption, DisplayableFacet, SortBy } from '@yext/answers-core';
import { FiltersState } from '../models/slices/filters';
import { SelectableFilter } from '../models/utils/selectablefilter';

const initialState: FiltersState = {};

interface FacetPayload {
  fieldId: string
  facetOption: FacetOption
  shouldSelect: boolean
}

interface FilterPayload {
  filterCollectionId: string
  filter: Filter
  shouldSelect: boolean
}

const reducers = {
  setStatic: (
    state: FiltersState,
    action: PayloadAction<Record<string, SelectableFilter[]>>
  ) => {
    state.static = action.payload;
  },
  setFacets: (state: FiltersState, action: PayloadAction<DisplayableFacet[]>) => {
    state.facets = action.payload;
  },
  setSortBys: (state: FiltersState, action: PayloadAction<SortBy[]>) => {
    state.sortBys = action.payload;
  },
  resetFacets: (state: FiltersState) => {
    state.facets?.forEach(facet => {
      facet.options.forEach(o => o.selected = false);
    });
  },
  toggleFacetOption: (state: FiltersState, { payload }: PayloadAction<FacetPayload>) => {
    if (!state.facets) {
      console.warn('Trying to select a facet option when no facets exist.');
      return;
    }
    const { fieldId, facetOption: optionToSelect, shouldSelect } = payload;
    const facetsWithFieldId = state.facets.filter(f => f.fieldId === fieldId);
    if (facetsWithFieldId.length === 0) {
      console.warn(
        `Could not select a facet option for fieldId "${fieldId}": the fieldId was not found.`);
      return;
    }
    facetsWithFieldId.forEach(facet => {
      // Mutating is OK because redux-toolkit uses the immer package
      facet.options = facet.options.map(o => {
        if (o.matcher !== optionToSelect.matcher || o.value !== optionToSelect.value) {
          return o;
        }
        return { ...o, selected: shouldSelect };
      });
    });
  },
  toggleFilterOption: (state: FiltersState, { payload }: PayloadAction<FilterPayload>) => {
    if (!state.static) {
      state.static = {};
    }
    const { filterCollectionId, filter: targetFilter, shouldSelect } = payload;
    if (!state.static[filterCollectionId]) {
      if (filterCollectionId && shouldSelect) {
        state.static[filterCollectionId] = [];
      } else {
        console.warn(`invalid static filters id: ${filterCollectionId}`);
        return;
      }
    }
    const filterCollection = state.static[filterCollectionId];
    const foundFilter = filterCollection.find(storedSelectableFilter => {
      const storedFilter = storedSelectableFilter.filter;
      return storedFilter.fieldId === targetFilter.fieldId
        && storedFilter.matcher === targetFilter.matcher
        && storedFilter.value === targetFilter.value;
    });
    if (foundFilter) {
      foundFilter.selected = shouldSelect;
    } else if (shouldSelect) {
      filterCollection.push({
        filter: targetFilter,
        selected: shouldSelect
      });
    } else {
      console.warn('Could not unselect a non-existing filter option in state'
        + ` with following fields:\n${JSON.stringify(targetFilter)}.`);
    }
  }
};

/**
 * Registers with Redux the slice of {@link State} pertaining to filters. There
 * are reducers for setting the static filters.
 */
export default function createFiltersSlice(prefix: string): Slice<FiltersState, typeof reducers> {
  return createSlice({
    name: prefix + 'filters',
    initialState,
    reducers
  });
}
