import { ThunkConfig } from "@/app/providers/StoreProvider/config/state.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Instrument } from "../../types/instrument.interface";
import { userActions } from "@/entities/User";
import { toast } from "sonner";



export const favoriteInstrument = createAsyncThunk<
  void,
  Instrument,
  ThunkConfig<string>
>('instrument/favorite', async (instrument, thunkApi) => {
  const { extra, rejectWithValue, dispatch } = thunkApi;
  try {
    const response = await extra.api.get("/instruments/" + instrument.id + "/like");
    const { i18n } = extra;
    if (response.status !== 200) {
      throw new Error()
    }

    dispatch(userActions.addToFavorites(instrument))
    toast(i18n.t('popups.addToFav'));
  }
  catch (error) {
    console.log('Error fetching instruments: ', error);

    return rejectWithValue('Error to favorite instrument. Please try again.');
  }
});
