import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as authService from '../services/authService'

export const fetchMe = createAsyncThunk('auth/fetchMe', async (_, { rejectWithValue }) => {
  try {
    const { data } = await authService.getMe()
    return data.user
  } catch {
    return rejectWithValue(null)
  }
})

export const loginUser = createAsyncThunk('auth/login', async (creds, { rejectWithValue }) => {
  try {
    const { data } = await authService.login(creds)
    return data.user
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Login failed')
  }
})

export const registerUser = createAsyncThunk('auth/register', async (creds, { rejectWithValue }) => {
  try {
    const { data } = await authService.register(creds)
    return data.user
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Registration failed')
  }
})

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: false, error: null, initialized: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.fulfilled,    (s, a) => { s.user = a.payload; s.initialized = true })
      .addCase(fetchMe.rejected,     (s)    => { s.initialized = true })
      .addCase(loginUser.pending,    (s)    => { s.loading = true; s.error = null })
      .addCase(loginUser.fulfilled,  (s, a) => { s.loading = false; s.user = a.payload })
      .addCase(loginUser.rejected,   (s, a) => { s.loading = false; s.error = a.payload })
      .addCase(registerUser.pending, (s)    => { s.loading = true; s.error = null })
      .addCase(registerUser.fulfilled,(s, a)=> { s.loading = false; s.user = a.payload })
      .addCase(registerUser.rejected,(s, a) => { s.loading = false; s.error = a.payload })
      .addCase(logoutUser.fulfilled, (s)    => { s.user = null })
  },
})

export default authSlice.reducer
