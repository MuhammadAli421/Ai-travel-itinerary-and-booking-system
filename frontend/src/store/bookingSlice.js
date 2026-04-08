import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as svc from '../services/bookingService'

export const fetchBookings  = createAsyncThunk('booking/fetchAll', async (_, { rejectWithValue }) => {
  try { return (await svc.getBookings()).data.data } catch (e) { return rejectWithValue(e.response?.data?.message) }
})
export const createBooking  = createAsyncThunk('booking/create', async (data, { rejectWithValue }) => {
  try { return (await svc.createBooking(data)).data.data } catch (e) { return rejectWithValue(e.response?.data?.message) }
})
export const updateBooking  = createAsyncThunk('booking/update', async ({ id, data }, { rejectWithValue }) => {
  try { return (await svc.updateBooking(id, data)).data.data } catch (e) { return rejectWithValue(e.response?.data?.message) }
})
export const deleteBooking  = createAsyncThunk('booking/delete', async (id, { rejectWithValue }) => {
  try { await svc.deleteBooking(id); return id } catch (e) { return rejectWithValue(e.response?.data?.message) }
})

const bookingSlice = createSlice({
  name: 'booking',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending,   (s) => { s.loading = true })
      .addCase(fetchBookings.fulfilled, (s, a) => { s.loading = false; s.items = a.payload })
      .addCase(fetchBookings.rejected,  (s, a) => { s.loading = false; s.error = a.payload })
      .addCase(createBooking.fulfilled, (s, a) => { s.items.unshift(a.payload) })
      .addCase(updateBooking.fulfilled, (s, a) => { const i = s.items.findIndex(x => x._id === a.payload._id); if (i !== -1) s.items[i] = a.payload })
      .addCase(deleteBooking.fulfilled, (s, a) => { s.items = s.items.filter(x => x._id !== a.payload) })
  },
})

export default bookingSlice.reducer
