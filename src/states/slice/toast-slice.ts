import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Toast {
  isOpen: boolean;
}

const initialState: Toast = {
  isOpen: false,
};


const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToast(state, action: PayloadAction<Toast>) {
      state.isOpen = action.payload.isOpen
    },
  },
});

export const { setToast } = toastSlice.actions;

export default toastSlice.reducer