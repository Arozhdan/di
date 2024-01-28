import { createSlice } from '@reduxjs/toolkit'
import { SigninLocalSchema } from '../types/signin-local.schema'
import { signinLocal } from '../services/singin-local.service'


const initialState: SigninLocalSchema = {
  email: '',
  password: '',
  isLoading: false,
  error: null,
}

const signinLocalSlice = createSlice({
  name: 'signinLocal',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload
    },
    setPassword: (state, action) => {
      state.password = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    reset: () => initialState,
  },
  extraReducers(builder) {
    builder.addCase(signinLocal.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(signinLocal.fulfilled, (state,) => {
      state.isLoading = false
      state.error = null
    })
    builder.addCase(signinLocal.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload || 'Error'
    })
  }
})

export const signinLocalReducer = signinLocalSlice.reducer
export const signinLocalActions = signinLocalSlice.actions