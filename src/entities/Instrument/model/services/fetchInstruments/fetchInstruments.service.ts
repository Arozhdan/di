import { ThunkConfig } from "@/app/providers/StoreProvider/config/state.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Instrument } from "../../types/instrument.interface";


interface InstrumentsResponse {
  docs: Instrument[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export const fetchInstruments = createAsyncThunk<
  Instrument[],
  undefined,
  ThunkConfig<string>
>('instrument/fetch', async (_, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;
  try {
    const response = await extra.api.get<InstrumentsResponse>("/instruments");

    if (!response.data || !response.data.docs.length) {
      throw new Error()
    }

    return response.data.docs;
  } catch (error) {
    console.log('Error fetching instruments: ', error);

    return rejectWithValue('Error fetching instruments. Please try again.');
  }
});
