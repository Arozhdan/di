import { ThunkConfig } from "@/app/providers/StoreProvider/config/state.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { History } from "../../types/History.interface";
import { toast } from "sonner";


interface UpdateHistoryResponse {
  message: string;
  doc: History;
}

interface UpdateHistoryProps {
  id: string;
  value: string;
}

export const updateHistory = createAsyncThunk<
  History,
  UpdateHistoryProps,
  ThunkConfig<string>
>(
  'history/updateHistory',
  async (props, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
      console.log('Updating history', props);

      const response = await extra.api.patch<UpdateHistoryResponse>("/history/" + props.id, {
        output: props.value
      });

      if (response.status !== 200) {
        throw new Error()
      }

      toast('Record updated successfully.')

      return response.data.doc;

    } catch (error) {
      console.log('Error updating history', error);

      return rejectWithValue('Error updating history.');
    }
  }
)