import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CombinedFilter, Filter, FacetOption, DisplayableFacet, SortBy } from '@yext/answers-core';
import { FiltersState } from '../models/slices/filters';

const initialState: FiltersState = {};

interface FacetPayload {
  fieldId: string
  facetOption: FacetOption
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
    setStatic: (state: FiltersState, action: PayloadAction<Filter|CombinedFilter|null>) => {
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
        facet.options = facet.options?.map(option => {
          return { ...option, selected: false };
        });
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
  }
});

export const { setStatic, toggleFacetOption, setFacets, resetFacets } = filtersSlice.actions;
export default filtersSlice.reducer;