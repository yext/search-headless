import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { FacetOption, DisplayableFacet } from '@yext/search-core';
import { SelectableCombinedFilter, SelectableFilter } from '../models/utils/selectableFilter';
import { FiltersState } from '../models/slices/filters';
import isEqual from 'lodash/isEqual';
import { areCombinedFiltersEqual, areFiltersEqual, isCombinedFilter } from '../utils/filter-utils';

export const initialState: FiltersState = {};

interface FacetPayload {
  fieldId: string,
  facetOption: FacetOption,
  shouldSelect: boolean
}

const reducers = {
  setStatic: (
    state: FiltersState,
    action: PayloadAction<(SelectableFilter | SelectableCombinedFilter)[]>
  ) => {
    state.static = action.payload;
  },
  setFacets: (state: FiltersState, action: PayloadAction<DisplayableFacet[]>) => {
    state.facets = action.payload;
  },
  resetFacets: (state: FiltersState) => {
    state.facets?.forEach(facet => {
      facet.options.forEach(o => o.selected = false);
    });
  },
  setFacetOption: (state: FiltersState, { payload }: PayloadAction<FacetPayload>) => {
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
        if (o.matcher !== optionToSelect.matcher || !isEqual(o.value, optionToSelect.value)) {
          return o;
        }
        return { ...o, selected: shouldSelect };
      });
    });
  },
  /**
   * Sets whether a static filter currently in the state is selected or unselected.
   * If the specified static filter should be selected, but is not in state, it will
   * be added to the state.
   */
  setFilterOption: (
    state: FiltersState,
    { payload }: PayloadAction<SelectableFilter | SelectableCombinedFilter>
  ) => {
    if (!state.static) {
      state.static = [];
    }
    const { selected, displayName: _, ...targetFilter } = payload;
    const matchingFilter = state.static.find(storedFilter => {
      if (isCombinedFilter(storedFilter) && isCombinedFilter(targetFilter)) {
        return areCombinedFiltersEqual(storedFilter, targetFilter);
      }
      if (!isCombinedFilter(storedFilter) && !isCombinedFilter(targetFilter)) {
        return areFiltersEqual(storedFilter, targetFilter);
      }
      return false;
    });
    if (matchingFilter) {
      matchingFilter.selected = selected;
    } else if (selected) {
      state.static.push(payload);
    } else {
      console.warn('Could not unselect a non-existing filter option in state '
        + `with the following fields:\n${JSON.stringify(targetFilter)}.`);
    }
  }
};

/**
 * Registers with Redux the slice of {@link State} pertaining to filters. There are
 * reducers for setting the static filters and facet options.
 */
export default function createFiltersSlice(prefix: string): Slice<FiltersState, typeof reducers> {
  return createSlice({
    name: prefix + 'filters',
    initialState,
    reducers
  });
}
