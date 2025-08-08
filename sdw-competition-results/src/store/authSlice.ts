// src/store/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getApiUrl } from 'config/apiConfig';
import { ConfigEnvironment, WidgetConfig } from 'types/WidgetConfig';

interface AuthState {
  token: string | null;
  expiresAt: number | null; // timestamp in ms
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  expiresAt: null,
  loading: false,
  error: null,
};
export const getEnvironmentRealm = (environment: ConfigEnvironment): string => {
  switch (environment) {
    case 'production':
      return 'prod';
    case 'development':
      return 'dev';
    case 'staging':
      return 'staging';
    case 'live':
      return 'live';
    default:
      throw new Error(`Unknown environment: ${environment}`);
  }
};
export const fetchAccessToken = createAsyncThunk(
  'auth/fetchAccessToken',
  async (config: WidgetConfig, { rejectWithValue }) => {
    if (!config?.apiKey || !config?.environment) {
      return rejectWithValue(`Missing API configuration `);
    }
    const tokenUrl = `${getApiUrl(config.environment)}/auth/oauth2/realms/root/realms/${getEnvironmentRealm(config.environment)}/access_token`;
    try {
      const response = await axios.post(
        tokenUrl,
        new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: config.apiKey,
          client_secret: 'WjyfnsRePDFrLbgTtmAZdk', // safely stored in .env if needed
          scope: 'DATA_READER',
        }),
        {
          headers: {
            'Accept-API-Version': 'resource=3.1, protocol=1.0',
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      return {
        access_token: response.data.access_token,
        expires_in: response.data.expires_in,
      };
    } catch (err: any) {
      return rejectWithValue(err.response?.data ?? err.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      const { token, expiresIn } = action.payload;
      state.token = token;
      state.expiresAt = Date.now() + expiresIn * 1000; // Set expiration time
    },
    logout: (state) => {
      state.token = null;
      state.expiresAt = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccessToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccessToken.fulfilled, (state, action) => {
        state.token = action.payload.access_token;
        state.expiresAt = Date.now() + action.payload.expires_in * 1000;
        state.loading = false;
      })
      .addCase(fetchAccessToken.rejected, (state, action) => {
        state.error = (action.payload as string) ?? 'Failed to fetch token';
        state.loading = false;
      });
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
