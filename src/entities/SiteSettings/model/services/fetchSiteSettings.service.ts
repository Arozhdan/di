import { ThunkConfig } from "@/app/providers/StoreProvider/config/state.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SiteSettings } from "../types/SiteSettings.interface";




export const fetchSiteSettings = createAsyncThunk<
  SiteSettings,
  undefined,
  ThunkConfig<string>
>('site-settings/fetch', async (_, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;
  try {
    const locale = extra.i18n.language;
    const response = await extra.api.get<SiteSettings>("/globals/settings", {
      params: {
        locale,
      },
    });


    if (!response.data || !response.data.email) {
      throw new Error()
    }

    return response.data;
  } catch (error) {
    console.log('Error fetching instruments: ', error);

    return rejectWithValue('Error fetching instruments. Please try again.');
  }
});
