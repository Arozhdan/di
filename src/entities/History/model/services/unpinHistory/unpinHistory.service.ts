import { ThunkConfig } from "@/app/providers/StoreProvider/config/state.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { History } from "../../types/History.interface";
import { historyActions } from "../../slice/history.slice";
import { toast } from "sonner";
import { pinHistory } from "../pinHistory/pinHistory.service";

export const unpinHistory = createAsyncThunk<
  void,
  History,
  ThunkConfig<string>
>('instrument/unfavorite', async (history, thunkApi) => {
  const { extra, rejectWithValue, dispatch } = thunkApi;
  try {
    const { i18n } = extra;
    const response = await extra.api.get("/history/" + history.id + "/unpin");

    if (response.status !== 200) {
      throw new Error()
    }

    dispatch(historyActions.unpinHistory(history))
    toast(i18n.t('popups.unpin_success'), {
      action: {
        label: i18n.t('general.undo'),
        onClick: () => {
          dispatch(pinHistory(history))
        }
      }
    })
  }
  catch (error) {
    console.log('Error fetching instruments: ', error);

    return rejectWithValue('Error to unfavorite instrument. Please try again.');
  }
}
);