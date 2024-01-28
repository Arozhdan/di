import { ThunkConfig } from "@/app/providers/StoreProvider/config/state.schema";
import { historyActions } from "@/entities/History";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const deleteHistory = createAsyncThunk<
  void,
  string,
  ThunkConfig<string>
>('history/delete', async (historyId, thunkApi) => {
  const { extra, rejectWithValue, dispatch } = thunkApi;
  try {
    const response = await extra.api.delete("/history/" + historyId);

    if (response.status !== 200) {
      throw new Error()
    }

    dispatch(historyActions.deleteHistory(historyId))
    toast('Record deleted successfully')
  }
  catch (error) {
    console.log('Error fetching instruments: ', error);

    return rejectWithValue('Error to delete history. Please try again.');
  }
})