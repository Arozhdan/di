import { ThunkConfig } from "@/app/providers/StoreProvider/config/state.schema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ChatItem } from "../..";
import { toast } from "sonner";


export const deleteChat = createAsyncThunk<
  string,
  string,
  ThunkConfig<string>
>('chat/delete', async (id, thunkApi) => {
  const { extra, rejectWithValue } = thunkApi;
  try {
    const { i18n } = extra;
    const response = await extra.api.delete<ChatItem>('/chat/' + id);

    if (response.status !== 200 || !response.data) {
      return rejectWithValue('Error deleting chat. Please try again.');
    }
    toast(i18n.t('popups.recorddelete'));
    return response.data.id;
  } catch (error) {
    console.log('Error deleting chat: ', error);
    return rejectWithValue('Error deleting chat. Please try again.');
  }
});
