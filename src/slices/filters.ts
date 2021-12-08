import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Filter, FacetOption, DisplayableFacet } from '@yext/answers-core';
import { FiltersState } from '../models/slices/filters';
import { SelectableFilter } from '../models/utils/selectablefilter';
import { areFiltersEqual } from '../utils/filter-utils';

const initialState: FiltersState = {};

/**
 * The payload for updating a facet option.
 */
interface FacetPayload {
  /**
   * The fieldId of the facet option to update.
   */
  fieldId: string
  /**
   * The facet option to update.
   */
  facetOption: FacetOption
  /**
   * Whether the facet option should be selected or not.
   */
  shouldSelect: boolean
}

/**
 * The payload for updating a static filter.
 */
interface FilterPayload {
  /**
   * The static filter to update.
   */
  filter: Filter
  /**
   * Whether the filter should be selected or not.
   */
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
  /**
   * Resets all facets to be unselected.
   */
  resetFacets: (state: FiltersState) => {
    state.facets?.forEach(facet => {
      facet.options.forEach(o => o.selected = false);
    });
  },
  /**
   * Selects or unselects a specified facet option.
   */
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
  /**
   * Sets whether a static filter currently in the state is selected or unselected.
   * If the specified static filter should be selected, but is not in state, it will
   * be added to the state.
   */
  setFilterOption: (state: FiltersState, { payload }: PayloadAction<FilterPayload>) => {
    if (!state.static) {
      state.static = [];
    }
    const { filter: targetFilter, shouldSelect } = payload;
    const matchingFilter = state.static.find(storedSelectableFilter => {
      const { selected:_, ...storedFilter } = storedSelectableFilter;
      return areFiltersEqual(storedFilter, targetFilter);
    });
    if (matchingFilter) {
      matchingFilter.selected = shouldSelect;
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
 * Registers with Redux the slice of {@link State} pertaining to filters. There are
 * reducers for setting the static filters and facet options.
 *
 * @param prefix - The prefix to access the part of the Redux store specific to the
 *                 AnswersHeadless instance
 * @returns The {@link Slice} for filters
 */
export default function createFiltersSlice(prefix: string): Slice<FiltersState, typeof reducers> {
  return createSlice({
    name: prefix + 'filters',
    initialState,
    reducers
  });
}
