import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, checkUser } from './authApi';

// Define your initial state with hard-coded user data
const initialState = {
  loggedInUserToken: localStorage.getItem('loggedInUserToken')
  ? JSON.parse(localStorage.getItem('loggedInUserToken'))
  : null,
  status: 'idle',
  error: null
};

// Async thunk action creator for creating a user
export const createUserAsync = createAsyncThunk(
  'auth/createUser',
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

// Async thunk action creator for checking a user
export const loginUserAsync = createAsyncThunk(
  'user/checkUser',
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await checkUser(loginInfo);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);


// Define your auth slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Your other reducers here if needed
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
        localStorage.setItem('loggedInUserToken', JSON.stringify(action.payload));
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
        localStorage.setItem('loggedInUserToken', JSON.stringify(action.payload));
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      });
  },
});

// Export your actions and selectors
export const { increment } = authSlice.actions;
export const selectedUser = (state) => state.auth.loggedInUserToken;
export const errorLogin = (state) => state.auth.error;
export default authSlice.reducer;
