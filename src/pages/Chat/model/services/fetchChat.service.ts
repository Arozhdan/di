import { ThunkConfig } from "@/app/providers/StoreProvider/config/state.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ChatItem } from "../..";

interface FetchChatResponse {
  docs: ChatItem[];
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

export const fetchChat = createAsyncThunk<
  ChatItem[],
  undefined,
  ThunkConfig<string>
>('chat/fetchChat', async (_, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;
  try {
    const response = await extra.api.get<FetchChatResponse>('/chat', {
      params: {
        limit: 500,
      },
    });

    if (response.status !== 200 || !response.data) {
      return rejectWithValue('Error fetching chats. Please try again.');
    }
    return response.data.docs;
  } catch (error) {
    console.log('Error fetching chats: ', error);

    return rejectWithValue('Error fetching chats. Please try again.');
  }
});
