import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DisplayableFacet, Facet } from '@yext/answers-core';
import { FacetsState } from '../models/slices/facets';

const initialState: FacetsState = {};

/**
 * Registers with Redux the slice of {@link State} pertaining to queries. There
 * are reducers for setting the query string, trigger, source, and id.
 */
export const facetsSlice = createSlice({
  name: 'facets',
  initialState,
  reducers: {
    setFacets: (state: FacetsState, action: PayloadAction<Facet[]>) => {
        state.facets = action.payload;
      },
    setDisplayableFacets: (state: FacetsState, action: PayloadAction<DisplayableFacet[]>) => {
        console.log('displayable facets are being set')
        state.displayableFacets = action.payload;
      },
  }
});

export const { setFacets, setDisplayableFacets } = facetsSlice.actions;
export default facetsSlice.reducer;