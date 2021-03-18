import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QueryState {
  query?: string,
  queryId?: string,
  queryTrigger?: string,
  querySource?: string
}

const initialState: QueryState = {};

export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setTrigger: (state, action: PayloadAction<string>) => {
      state.queryTrigger = action.payload;
    },
    setSource: (state, action: PayloadAction<string>) => {
      state.querySource = action.payload;
    },
    setQueryId: (state, action: PayloadAction<string>) => {
      state.queryId = action.payload;
    }
  }
});

export default querySlice.reducer;