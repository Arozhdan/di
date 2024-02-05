import { ThunkConfig } from "@/app/providers/StoreProvider/config/state.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ChatItem } from "../..";
import { toast } from "sonner";


export const deleteAllChats = createAsyncThunk<
  undefined,
  undefined,
  ThunkConfig<string>
>('chat/deleteAll', async (_, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;
  try {
    const response = await extra.api.delete<ChatItem>('/chat/deleteAll');

    if (response.status !== 200 || !response.data) {
      return rejectWithValue('Error deleting chats. Please try again.');
    }
    toast('Your chats have been deleted.');
  } catch (error) {
    console.log('Error deleting chats: ', error);
    return rejectWithValue('Error deleting chats. Please try again.');
  }
});
