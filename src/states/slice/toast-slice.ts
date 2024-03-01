import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Toast {
  isOpen?: boolean;
  status: string;
  message: string;
}

const initialState: Toast = {
  isOpen: false,
  status: '',
  message: '',
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToast(state, action: PayloadAction<Toast>) {
      state.isOpen = true;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    unSetToast(state) {
      state.isOpen = false;
    },
  },
});

export const { setToast, unSetToast } = toastSlice.actions;

export default toastSlice.reducer;
