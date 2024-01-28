import { createSlice } from "@reduxjs/toolkit";
import { SiteSettingsSchema } from "../types/SiteSettings.schema";
import { fetchSiteSettings } from "../services/fetchSiteSettings.service";


const initialState: SiteSettingsSchema = {
  isLoaded: false,
  error: null,
  data: null,
};

export const siteSettingsSlice = createSlice({
  name: "siteSettings",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchSiteSettings.pending, (state) => {
      state.isLoaded = false;
      state.error = null;
    });
    builder.addCase(fetchSiteSettings.fulfilled, (state, action) => {
      state.isLoaded = true;
      state.data = action.payload;
    });
    builder.addCase(fetchSiteSettings.rejected, (state, action) => {
      state.isLoaded = false;
      state.error = action.payload as string;
    });
  },
});

export const siteSettingsReducer = siteSettingsSlice.reducer;