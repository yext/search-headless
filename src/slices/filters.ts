import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Filter, FacetOption, DisplayableFacet, SortBy } from '@yext/answers-core';
import { FiltersState } from '../models/slices/filters';
import { SelectableFilter } from '../models/utils/selectablefilter';
import { areFiltersEqual } from '../utils/filter-utils';

const initialState: FiltersState = {};

interface FacetPayload {
  fieldId: string
  facetOption: FacetOption
  shouldSelect: boolean
}

interface FilterPayload {
  filter: Filter
  shouldSelect: boolean
}

const reducers = {
  setStatic: (
    state: FiltersState,
    action: PayloadAction<SelectableFilter[]>
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
  setFilterOption: (state: FiltersState, { payload }: PayloadAction<FilterPayload>) => {
    if (!state.static) {
      state.static = [];
    }
    const { filter: targetFilter, shouldSelect } = payload;
    const matchedFilter = state.static.find(storedSelectableFilter => {
      const { selected:_, ...storedFilter } = storedSelectableFilter;
      return areFiltersEqual(storedFilter, targetFilter);
    });
    if (matchedFilter) {
      matchedFilter.selected = shouldSelect;
    } else if (shouldSelect) {
      const selectedFilter = { ...targetFilter, selected: shouldSelect };
      state.static.push(selectedFilter);
    } else {
      console.warn('Could not unselect a non-existing filter option in state '
        + `with the following fields:\n${JSON.stringify(targetFilter)}.`);
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
