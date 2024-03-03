import { ThunkConfig } from "@/app/providers/StoreProvider/config/state.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Subscription } from "../..";

interface FetchSubscriptionResponse {
  docs: Subscription[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null;
  nextPage: null;
}

export const fetchSubscription = createAsyncThunk<
  Subscription | null,
  undefined,
  ThunkConfig<string>
>('subscription/fetchSubscription', async (_, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;
  try {
    const response = await extra.api.get<FetchSubscriptionResponse>('/subscriptions?depth=1', {
      params: {
        limit: 1,
      },
    });

    if (response.status !== 200) {
      return rejectWithValue('Error fetching subscription. Please try again.');
    }
    return response.data.docs.length > 0 ? response.data.docs[0] : null;
  } catch (error) {
    console.log('Error fetching chats: ', error);
    return rejectWithValue('Error fetching subscription. Please try again.');
  }
});
