import { ThunkConfig } from "@/app/providers/StoreProvider/config/state.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const unsubscribe = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>('subscription/fetchSubscription', async (_, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;
  try {
    const { i18n } = extra;
    const response = await extra.api.post('/subscriptions/unsubscribe');

    if (response.status !== 200) {
      return rejectWithValue('Error unsubscribing. Please try again.');
    }
    toast(
      i18n.t('subscription:unsubscribeSuccess'),
      {
        description: i18n.t('subscription:unsubscribeSuccessDescription'),
      }
    )
  } catch (error) {
    console.log('Error unsubscribing: ', error);
    return rejectWithValue('Error unsubscribing. Please try again.');
  }
});
