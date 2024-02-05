import { ThunkConfig } from "@/app/providers/StoreProvider/config/state.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { ChatItem } from "../..";




export const createChat = createAsyncThunk<
  ChatItem,
  undefined,
  ThunkConfig<string>
>('chat/createChat', async (_, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;
  try {
    const response = await extra.api.get<ChatItem>('/chat/create');

    if (response.status !== 200 || !response.data) {
      return rejectWithValue('Error creating chat. Please try again.');
    }
    toast('Chat successfully created.');
    return response.data;
  } catch (error) {
    console.log('Error signing in: ', error);

    return rejectWithValue('Error signing in. Please try again.');
  }
});
