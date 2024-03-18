import { ThunkConfig } from "@/app/providers/StoreProvider/config/state.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { History } from "../../types/History.interface";
import { historyActions } from "../../slice/history.slice";



export const pinHistory = createAsyncThunk<
  void,
  History,
  ThunkConfig<string>
>('instrument/favorite', async (history, thunkApi) => {
  const { extra, rejectWithValue, dispatch } = thunkApi;
  try {
    const { i18n } = extra;
    const response = await extra.api.get("/history/" + history.id + "/pin");

    if (response.status !== 200) {
      throw new Error()
    }

    dispatch(historyActions.pinHistory(history))
    toast(i18n.t('popups.pin_success'));
  }
  catch (error) {
    console.log('Error fetching instruments: ', error);

    return rejectWithValue('Error to favorite instrument. Please try again.');
  }
});
