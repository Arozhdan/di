import { createSlice } from '@reduxjs/toolkit'
import { AuthLocalSchema } from '../types/auth-local.schema'
import { signinLocal } from '../services/singin-local.service'
import { signupLocal } from '../services/signup-local.service'


const initialState: AuthLocalSchema = {
  email: '',
  password: '',
  isLoading: false,
  error: null,
}

const authLocalSlice = createSlice({
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
    builder.addCase(signupLocal.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(signupLocal.fulfilled, (state,) => {
      state.isLoading = false
      state.error = null
      state.verificatioSent = true
    })
    builder.addCase(signupLocal.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload || 'Error'
    })
  }
})

export const authLocalReducer = authLocalSlice.reducer
export const authLocalActions = authLocalSlice.actions