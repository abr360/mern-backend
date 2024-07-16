import { createSlice } from '@reduxjs/toolkit';
import { useRegisterMutation, useLoginMutation } from './authService';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null, // Rehydrate user state
  isAuthenticated: !!localStorage.getItem('user'), // Set isAuthenticated based on localStorage
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.isLoading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      localStorage.removeItem('user');
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, setLoading, setError, logout } = authSlice.actions;

// Exporting async actions for use with React Query mutations
export const registerUser = (userData) => async (dispatch) => {
  const registerMutation = useRegisterMutation();
  try {
    dispatch(setLoading());
    const data = await registerMutation.mutateAsync(userData);
    dispatch(setUser(data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const loginUser = (userData) => async (dispatch) => {
  const loginMutation = useLoginMutation();
  try {
    dispatch(setLoading());
    const data = await loginMutation.mutateAsync(userData);
    dispatch(setUser(data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default authSlice.reducer;
