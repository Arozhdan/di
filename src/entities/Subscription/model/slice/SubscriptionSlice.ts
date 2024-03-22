import { createSlice } from '@reduxjs/toolkit'
import { SubscriptionSchema } from '../types/Subscription.schema'
import { fetchSubscription } from '../services/fetchSubscription.service'


const initialState: SubscriptionSchema = {
  data: null,
  loading: false,
  error: null,
  billing: []
}

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers(builder) {
    builder.addCase(fetchSubscription.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchSubscription.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload

    })
    builder.addCase(fetchSubscription.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload || 'Error fetching subscription. Please try again.'
    })

  }
})

export const subscriptionReducer = subscriptionSlice.reducer
export const subscriptionActions = subscriptionSlice.actions