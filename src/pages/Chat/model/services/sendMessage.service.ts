import { ThunkConfig } from "@/app/providers/StoreProvider/config/state.schema";
import { userActions } from "@/entities/User";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { chatActions } from "../..";


interface SendMessagePayload {
  message: string;
  chatId: string;
}

interface SendMessageResponse {
  output: string;
  usage: number;
}

export const sendMessage = createAsyncThunk<
  void,
  SendMessagePayload,
  ThunkConfig<string>
>('chat/sendMessage', async ({ message, chatId }, thunkApi) => {
  const { extra, rejectWithValue, dispatch } = thunkApi;
  try {
    dispatch(chatActions.addNewMessage({ role: 'user', content: message, chatId }));
    dispatch(chatActions.setActiveChat(chatId));
    const response = await extra.api.patch<SendMessageResponse>('/chat/' + chatId + '/send', { message });

    if (response.status !== 200 || !response.data.output) {
      return rejectWithValue('Error sending message. Please try again.');
    }

    dispatch(userActions.updateUsage(response.data.usage))
    dispatch(chatActions.addNewMessage({ role: 'assistant', content: response.data.output, chatId }));
    dispatch(chatActions.setActiveChat(chatId));

  } catch (error) {
    console.log('Error sending message', error);
    return rejectWithValue('Error sending message. Please try again.');
  }
}
);