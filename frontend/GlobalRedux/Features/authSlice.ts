// authSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface authState {
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: authState = {
  accessToken: Cookies.get('accessToken') || null,
  refreshToken: Cookies.get('refreshToken') || null,
  loading: false,
  error: null,
};


export const refreshToken = createAsyncThunk<
    { accessToken: string; refreshToken: string }, // The type of data returned on success
    void, // The type of the argument passed to the thunk function
    { rejectValue: string } // The type of the error that will be passed to rejectWithValue
>(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      
      

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/user/refreshToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },        
        credentials: 'include',

      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = await response.json();
      // Cookies.set('accessToken', data.accessToken); // Update cookies
      // Cookies.set('refreshToken', data.refreshToken);
      return { accessToken: data.accessToken, refreshToken: data.refreshToken };
    } catch (error) {
      // Type guard to handle the error type safely
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens(state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) {   
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      Cookies.set('accessToken', action.payload.accessToken);
      Cookies.set('refreshToken', action.payload.refreshToken);
    },
    clearTokens(state) {
      state.accessToken = null;
      state.refreshToken = null;
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshToken.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.loading = false;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    });
    builder.addCase(refreshToken.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default authSlice.reducer;
export const { setTokens, clearTokens } = authSlice.actions;
