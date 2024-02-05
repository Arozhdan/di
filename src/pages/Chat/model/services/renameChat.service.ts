import { ThunkConfig } from "@/app/providers/StoreProvider/config/state.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ChatItem } from "../..";
import { toast } from "sonner";


export const renameChat = createAsyncThunk<
  ChatItem,
  { id: string, name: string },
  ThunkConfig<string>
>('chat/rename', async ({ id, name }, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;
  try {
    const response = await extra.api.patch<ChatItem>('/chat/' + id, { name });

    if (response.status !== 200 || !response.data) {
      return rejectWithValue('Error renaming chat. Please try again.');
    }
    toast('Chat successfully renamed.');
    return response.data;
  } catch (error) {
    console.log('Error renaming chat: ', error);
    return rejectWithValue('Error renaming chat. Please try again.');
  }
}
);