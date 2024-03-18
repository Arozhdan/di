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
  string,
  ThunkConfig<string>
>('subscription/fetchSubscription', async (userId, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;
  try {
    const response = await extra.api.get<FetchSubscriptionResponse>('/subscriptions', {
      params: {
        depth: 1,
        limit: 1,
        where: {
          owner: { equals: userId }
        }
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
