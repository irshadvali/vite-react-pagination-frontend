// src/features/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWithTimeout } from "../src/common/AppController";

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const data = await fetchWithTimeout(
        `http://localhost:5000/api/data?page=${page}&limit=${limit}`,
        {},
        10000 // 10s timeout
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState: {
    items: [],
    total: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default dataSlice.reducer;
