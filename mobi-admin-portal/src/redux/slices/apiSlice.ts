import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Generic async function to fetch/send data
export const apiRequest = createAsyncThunk(
  "api/apiRequest",
  async ({
    key,
    url,
    method = "GET",
    body,
  }: {
    key: string;
    url: string;
    method?: string;
    body?: any;
  }) => {
    const options: RequestInit = {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
    if (body) options.body = JSON.stringify(body);

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${key}`);
    }
    return { key, data: await response.json() };
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState: {
    data: {} as Record<string, any>,
    loading: {} as Record<string, boolean>, // ✅ Track loading per request
    error: {} as Record<string, string | null>,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(apiRequest.pending, (state, action) => {
        const key = action.meta.arg.key;
        state.loading[key] = true; // ✅ Only this key is loading
        state.error[key] = null;
      })
      .addCase(apiRequest.fulfilled, (state, action) => {
        const { key, data } = action.payload;
        state.loading[key] = false;
        state.data[key] = data;
      })
      .addCase(apiRequest.rejected, (state, action) => {
        const key = action.meta.arg.key;
        state.loading[key] = false;
        state.error[key] = action.error.message ?? null;
      });
  },
});

export const apiReducer = apiSlice.reducer;
