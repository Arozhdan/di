import { ThunkConfig } from "@/app/providers/StoreProvider/config/state.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { historyActions } from "../../slice/history.slice";
import { userActions } from "@/entities/User";

interface EditHistoryParams {
  id: string;
  input: string;
  command: string;
}

interface EditHistoryResponse {
  output: string;
  usage: number;
}

export const editHistory = createAsyncThunk<
  void,
  EditHistoryParams,
  ThunkConfig<string>
>('instrument/favorite', async (history, thunkApi) => {
  const { extra, rejectWithValue, dispatch } = thunkApi;
  try {
    const response = await extra.api.post<EditHistoryResponse>("/history/" + history.id + "/edit", {
      input: history.input,
      command: history.command
    });

    if (response.status !== 200) {
      throw new Error()
    }

    dispatch(historyActions.editHistory({
      id: history.id,
      output: response.data.output,
    }))

    dispatch(userActions.updateUsage(response.data.usage))

    toast('Record edited successfully')
  }
  catch (error) {
    console.log('Error edit history', error);

    return rejectWithValue('Error edit history')
  }
});
