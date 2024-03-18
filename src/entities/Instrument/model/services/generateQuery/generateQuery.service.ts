import { ThunkConfig } from "@/app/providers/StoreProvider/config/state.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { History, historyActions } from "@/entities/History";
import { userActions } from "@/entities/User";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";

interface GenerateQueryResponse {
  historyRecord: History;
  usage: number;
}

interface GenerateQueryPayload {
  input: string;
  instrumentId: string;
  language: string;
  tov: string;
}

export const generateQuery = createAsyncThunk<
  History,
  GenerateQueryPayload,
  ThunkConfig<string>
>('instrument/generate', async (props, thunkApi) => {
  const { extra, rejectWithValue, dispatch } = thunkApi;
  const { i18n } = extra;
  try {
    const response = await extra.api.post<GenerateQueryResponse>("/history/generate", {
      input: props.input,
      instrumentId: props.instrumentId,
      language: props.language,
      tov: props.tov
    });

    if (response.status !== 200 || !response.data.usage) {
      throw new Error()
    }

    dispatch(userActions.updateUsage(response.data.usage))
    dispatch(historyActions.addHistory(response.data.historyRecord))

    return response.data.historyRecord;

  } catch (error) {
    console.log('Error generating query', error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 402) {
        toast.error(i18n.t('instrument.queryLimitExceeded'))
      }
    }

    return rejectWithValue('Error generating query');
  }
});
