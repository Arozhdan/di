import { ThunkConfig } from "@/app/providers/StoreProvider/config/state.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { History } from "../types/History.interface";


interface FetchHistoryResponse {
  docs: History[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: null | number
  nextPage: number | null
}

export const fetchHistory = createAsyncThunk<
  History[],
  string,
  ThunkConfig<string>
>(
  'history/fetchHistory',
  async (userId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
      const response = await extra.api.get<FetchHistoryResponse>("/history", {
        params: {
          limit: 100,
          where: {
            owner: {
              equals: userId
            }
          }
        },
      });

      if (!response.data.totalDocs || !response.data.docs) {
        throw new Error()
      }

      return response.data.docs;
    } catch (error) {
      console.log('Error fetching history: ', error);

      return rejectWithValue('Error fetching history. Please try again.');
    }
  }
)