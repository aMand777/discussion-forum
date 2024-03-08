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
      return {
        ...state,
        isOpen: true,
        message: action.payload.message,
        status: action.payload.status,
      };
    },
    unSetToast(state) {
      return { ...state, isOpen: false };
    },
  },
});

export const { setToast, unSetToast } = toastSlice.actions;

export default toastSlice.reducer;
