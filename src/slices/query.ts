import { createSlice } from '@reduxjs/toolkit';

export const querySlice = createSlice({
  name: 'query',
  initialState: {
    query: '',
    queryTrigger: null,
    querySource: null
  },
  reducers: {
    set: (state, action) => {
      state.query = action.payload.query;
    },
    setTrigger: (state, action) => {
      state.queryTrigger = action.payload.trigger;
    },
    setSource: (state, action) => {
      state.querySource = action.payload.source;
    }
  }
});

export const { set, setTrigger, setSource } = querySlice.actions;
export default querySlice.reducer;