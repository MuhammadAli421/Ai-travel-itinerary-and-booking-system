import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as svc from '../services/itineraryService'

export const fetchItineraries  = createAsyncThunk('itinerary/fetchAll', async (_, { rejectWithValue }) => {
  try { return (await svc.getItineraries()).data.data } catch (e) { return rejectWithValue(e.response?.data?.message) }
})
export const createItinerary   = createAsyncThunk('itinerary/create', async (data, { rejectWithValue }) => {
  try { return (await svc.createItinerary(data)).data.data } catch (e) { return rejectWithValue(e.response?.data?.message) }
})
export const updateItinerary   = createAsyncThunk('itinerary/update', async ({ id, data }, { rejectWithValue }) => {
  try { return (await svc.updateItinerary(id, data)).data.data } catch (e) { return rejectWithValue(e.response?.data?.message) }
})
export const deleteItinerary   = createAsyncThunk('itinerary/delete', async (id, { rejectWithValue }) => {
  try { await svc.deleteItinerary(id); return id } catch (e) { return rejectWithValue(e.response?.data?.message) }
})

const itinerarySlice = createSlice({
  name: 'itinerary',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItineraries.pending,   (s) => { s.loading = true })
      .addCase(fetchItineraries.fulfilled, (s, a) => { s.loading = false; s.items = a.payload })
      .addCase(fetchItineraries.rejected,  (s, a) => { s.loading = false; s.error = a.payload })
      .addCase(createItinerary.fulfilled,  (s, a) => { s.items.unshift(a.payload) })
      .addCase(updateItinerary.fulfilled,  (s, a) => { const i = s.items.findIndex(x => x._id === a.payload._id); if (i !== -1) s.items[i] = a.payload })
      .addCase(deleteItinerary.fulfilled,  (s, a) => { s.items = s.items.filter(x => x._id !== a.payload) })
  },
})

export default itinerarySlice.reducer
