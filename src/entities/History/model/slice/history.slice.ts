import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HistorySchema } from "../types/History.schema";
import { History, editHistory, fetchHistory, updateHistory } from "../..";

const initialState: HistorySchema = {
  docs: [],
  isListLoading: false,
  filters: null,
  isRecordLoading: false,
  isGenerating: false
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<{
      key: 'instruments' | 'pinnedOnly' | 'input', value: string | boolean | string[]
    }>) => {
      state.filters = {
        ...state.filters,
        [action.payload.key]: action.payload.value
      }
    },
    clearFilters: (state) => {
      state.filters = null;
    },
    pinHistory: (state, action: PayloadAction<History>) => {
      const item = state.docs.find(item => item.id === action.payload.id);
      if (!item) return;
      item.isPinned = true;
    },
    unpinHistory: (state, action: PayloadAction<History>) => {
      const item = state.docs.find(item => item.id === action.payload.id);
      if (!item) return;
      item.isPinned = false;
    },
    deleteHistory: (state, action: PayloadAction<string>) => {
      state.docs = state.docs.filter(item => item.id !== action.payload);
    },
    addHistory: (state, action: PayloadAction<History>) => {
      state.docs.unshift(action.payload);
    },
    editHistory: (state, action: PayloadAction<{ id: string, output: string }>) => {
      const item = state.docs.find(item => item.id === action.payload.id);
      if (!item) return;
      item.output = action.payload.output;
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchHistory.pending, (state) => {
      state.isListLoading = true;
    }
    );
    builder.addCase(fetchHistory.fulfilled, (state, action) => {
      state.isListLoading = false;
      state.docs = action.payload;
    });
    builder.addCase(fetchHistory.rejected, (state) => {
      state.isListLoading = false;
    });
    builder.addCase(updateHistory.pending, (state) => {
      state.isRecordLoading = true;
    });
    builder.addCase(updateHistory.fulfilled, (state, action: PayloadAction<History>) => {
      state.isRecordLoading = false;
      const index = state.docs.findIndex(item => item.id === action.payload.id);
      if (index === -1) return;
      state.docs[index] = action.payload;
    });
    builder.addCase(updateHistory.rejected, (state) => {
      state.isRecordLoading = false;
    });
    builder.addCase(editHistory.pending, (state) => {
      state.isGenerating = true;
    });
    builder.addCase(editHistory.fulfilled, (state) => {
      state.isGenerating = false;
    });
    builder.addCase(editHistory.rejected, (state) => {
      state.isGenerating = false;
    });
  },

})

export const historyReducer = historySlice.reducer
export const historyActions = historySlice.actions