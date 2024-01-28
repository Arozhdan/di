import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InstrumentSchema } from "../types/instrument.schema";
import { fetchInstruments } from "../..";
import { generateQuery } from "../services/generateQuery/generateQuery.service";
const initialState: InstrumentSchema = {
  isListLoading: false,
  isListError: false,
  instruments: [],
  filters: null
}

const instrumentSlice = createSlice({
  name: "instrument",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<{
      key: 'name' | 'types' | 'onlyFavourites', value: string | boolean | string[]
    }>) => {
      state.filters = {
        ...state.filters,
        [action.payload.key]: action.payload.value
      }
    },
    removeFilter: (state, action: PayloadAction<'name' | 'types' | 'onlyFavourites'>) => {
      state.filters = {
        ...state.filters,
        [action.payload]: undefined
      }
    },
    setFilters: (state, action: PayloadAction<InstrumentSchema['filters']>) => {
      state.filters = action.payload
    },
    clearFilters: (state) => {
      state.filters = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInstruments.pending, (state) => {
      state.isListLoading = true
      state.isListError = false
    })
    builder.addCase(fetchInstruments.fulfilled, (state, action) => {
      state.isListLoading = false
      state.instruments = action.payload
      state.isListError = false
    })
    builder.addCase(fetchInstruments.rejected, (state) => {
      state.isListLoading = false
      state.isListError = true
    })
    builder.addCase(generateQuery.pending, (state) => {
      state.isGenerating = true
    })
    builder.addCase(generateQuery.fulfilled, (state) => {
      state.isGenerating = false
    })
    builder.addCase(generateQuery.rejected, (state) => {
      state.isGenerating = false
    })
  }
})

export const instrumentReducer = instrumentSlice.reducer
export const instrumentActions = instrumentSlice.actions