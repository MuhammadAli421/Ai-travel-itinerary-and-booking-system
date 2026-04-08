import { configureStore } from '@reduxjs/toolkit'
import authReducer      from './authSlice'
import itineraryReducer from './itinerarySlice'
import bookingReducer   from './bookingSlice'

export const store = configureStore({
  reducer: {
    auth:      authReducer,
    itinerary: itineraryReducer,
    booking:   bookingReducer,
  },
})
