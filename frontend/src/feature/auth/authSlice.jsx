import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const registers = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await authService.registers(userData);
      return response.data; // Assuming register function returns the user data
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = '';
    },
    logout: (state) => {
      localStorage.removeItem('user');
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(registers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.user = null;
        state.message = action.payload;
      });
  },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
