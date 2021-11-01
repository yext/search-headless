import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FacetOption, DisplayableFacet, SortBy, Filter } from '@yext/answers-core';
import { FiltersState } from '../models/slices/filters';
import { CombinedSelectableFilter, SelectableFilter } from '../models/utils/selectablefilter';
import { transformFiltersToHeadlessFormat } from '../utils/transform-filters';

const initialState: FiltersState = {};

interface FacetPayload {
  fieldId: string
  facetOption: FacetOption
  shouldSelect: boolean
}

interface FilterPayload {
  filterSetId?: string
  filter: Filter
  shouldSelect: boolean
}

/**
 * Registers with Redux the slice of {@link State} pertaining to filters. There
 * are reducers for setting the static filters.
 */
export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setStatic: (
      state: FiltersState,
      action: PayloadAction<Record<string, SelectableFilter | CombinedSelectableFilter>>
    ) => {
      state.static = action.payload;
    },
    setFacets: (state: FiltersState, action: PayloadAction<DisplayableFacet[]>) => {
      state.facets = action.payload;
    },
    setSortBys: (state: FiltersState, action: PayloadAction<SortBy[]>) => {
      state.sortBys = action.payload;
    },
    addFilters: (
      state: FiltersState,
      action: PayloadAction<{filterSetId: string, filters: Filter[]}>
    ) => {
      const { filterSetId, filters } = action.payload;
      if (!state.static) {
        state.static = {};
      }
      state.static[filterSetId] = transformFiltersToHeadlessFormat(filters);
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
        console.warn('Trying to select a static filter option when no static filters exist.');
        return;
      }
      const { filterSetId, filter, shouldSelect } = payload;
      let foundFilterOption = false;

      const handleFilterOptionSelection = (
        storedFilters: SelectableFilter | CombinedSelectableFilter,
        targetFilter: Filter
      ) => {
        if ('selected' in storedFilters) {
          const storedFilter = storedFilters.filter;
          if (storedFilter.fieldId === targetFilter.fieldId
            && storedFilter.matcher === targetFilter.matcher
            && storedFilter.value === targetFilter.value) {
            foundFilterOption = true;
            storedFilters.selected = shouldSelect;
          }
        } else {
          storedFilters.filters.map(filters => handleFilterOptionSelection(filters, targetFilter));
        }
      };

      if (filterSetId && !state.static[filterSetId]) {
        console.warn(`invalid static filters id: ${filterSetId}`);
        return;
      }
      const filtersInState = filterSetId && state.static[filterSetId];
      filtersInState
        ? handleFilterOptionSelection(filtersInState, filter)
        : Object.values(state.static)
          .forEach(storedFilters => storedFilters && handleFilterOptionSelection(storedFilters, filter));

      if (!foundFilterOption) {
        console.warn(
          `Could not select a filter option with following fields:\n${JSON.stringify(filter)}.`);
      }
    }
  }
});

export const {
  setStatic,
  addFilters,
  setFacets,
  resetFacets,
  toggleFacetOption,
  toggleFilterOption,
} = filtersSlice.actions;
export default filtersSlice.reducer;