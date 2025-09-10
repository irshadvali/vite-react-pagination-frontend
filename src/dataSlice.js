import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async ({ page, limit }) => {
    const response = await axios.get(`http://localhost:5000/api/data?page=${page}&limit=${limit}`)
    return response.data
  }
)

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
    total: 0,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.data
        state.total = action.payload.total
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export default dataSlice.reducer