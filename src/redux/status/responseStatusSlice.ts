import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export enum ResponseStatus {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface Status {
  isLoading: boolean;
  message?: string;
}

const initialState: Status = {
  isLoading: false,
  message: undefined,
};

const responseStatusSlice = createSlice({
  name: 'responseStatus',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setMessage: (state, action: PayloadAction<string | undefined>) => {
      state.message = action.payload;
    },
  },
});

export const { setLoading, setMessage } = responseStatusSlice.actions;

export default responseStatusSlice.reducer;
