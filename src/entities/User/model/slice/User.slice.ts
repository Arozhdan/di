import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserSchema } from "../types/User.schema";
import { initAuth } from "../services/initAuth/initAuth.service";
import { Instrument } from "@/entities/Instrument";

const initialState: UserSchema = {
  signedIn: null,
  isLoading: false,
  error: null,
  user: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log('action.payload: ', action.payload);
      state.error = null
      state.signedIn = true
      state.isLoading = false
      state.user = action.payload
    },
    addToFavorites: (state, action: PayloadAction<Instrument>) => {
      state.user?.favoriteInstruments.unshift(action.payload)
    },
    removeFromFavorites: (state, action: PayloadAction<Instrument>) => {
      if (!state.user?.favoriteInstruments) {
        return
      }
      state.user.favoriteInstruments = state.user?.favoriteInstruments.filter(
        (instrument) => instrument.id !== action.payload.id
      )
    },
    updateUsage: (state, action: PayloadAction<number>) => {
      if (!state.user) {
        return
      }
      state.user.totalUsage = state.user.totalUsage ? state.user.totalUsage + action.payload : action.payload
      state.user.monthlyUsage = state.user.monthlyUsage ? state.user.monthlyUsage + action.payload : action.payload
      state.user.totalQueries = state.user.totalQueries ? state.user.totalQueries + 1 : 1
      state.user.monthlyQueries = state.user.monthlyQueries ? state.user.monthlyQueries + 1 : 1
    },
    reset: () => ({ ...initialState, signedIn: false }),
  },
  extraReducers: (builder) => {
    builder.addCase(initAuth.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(initAuth.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload
      state.signedIn = true
    })
    builder.addCase(initAuth.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload || 'Error'
      state.signedIn = false
    })
  },
})

export const userReducer = userSlice.reducer
export const userActions = userSlice.actions
