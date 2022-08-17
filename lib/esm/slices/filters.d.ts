import { PayloadAction, Slice } from '@reduxjs/toolkit';
import { FacetOption, DisplayableFacet } from '@yext/answers-core';
import { SelectableFilter } from '../models/utils/selectableFilter';
import { FiltersState } from '../models/slices/filters';
export declare const initialState: FiltersState;
interface FacetPayload {
    fieldId: string;
    facetOption: FacetOption;
    shouldSelect: boolean;
}
declare const reducers: {
    setStatic: (state: FiltersState, action: PayloadAction<SelectableFilter[]>) => void;
    setFacets: (state: FiltersState, action: PayloadAction<DisplayableFacet[]>) => void;
    resetFacets: (state: FiltersState) => void;
    setFacetOption: (state: FiltersState, { payload }: PayloadAction<FacetPayload>) => void;
    /**
     * Sets whether a static filter currently in the state is selected or unselected.
     * If the specified static filter should be selected, but is not in state, it will
     * be added to the state.
     */
    setFilterOption: (state: FiltersState, { payload }: PayloadAction<SelectableFilter>) => void;
};
/**
 * Registers with Redux the slice of {@link State} pertaining to filters. There are
 * reducers for setting the static filters and facet options.
 */
export default function createFiltersSlice(prefix: string): Slice<FiltersState, typeof reducers>;
export {};
//# sourceMappingURL=filters.d.ts.map