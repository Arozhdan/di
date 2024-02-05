import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChatSchema } from "../types/Chat.schema";
import { createChat } from "../services/createChat.service";
import { deleteAllChats, deleteChat, fetchChat, renameChat } from "../..";
import { sendMessage } from "../services/sendMessage.service";

const initialState: ChatSchema = {
  docs: [],
  activeChat: null,
  isListLoading: false,
  isCreateLoading: false,
  generateLoadingList: []
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addNewMessage: (state, action: PayloadAction<{ role: 'user' | 'assistant', content: string, chatId: string }>) => {
      const chat = state.docs.find(chat => chat.id === action.payload.chatId);
      if (!chat) return;
      chat.messages.push({ role: action.payload.role, content: action.payload.content });
      chat.updatedAt = new Date().toISOString();
    },
    setActiveChat: (state, action: PayloadAction<string>) => {
      state.activeChat = state.docs.find(chat => chat.id === action.payload) || null;
    }
  },
  extraReducers(builder) {
    builder.addCase(createChat.pending, (state) => {
      state.isCreateLoading = true;
    });
    builder.addCase(createChat.fulfilled, (state, action) => {
      state.isCreateLoading = false;
      state.docs.unshift(action.payload);
      state.activeChat = action.payload;
    });
    builder.addCase(createChat.rejected, (state) => {
      state.isCreateLoading = false;
    });
    builder.addCase(fetchChat.pending, (state) => {
      state.isListLoading = true;
    });
    builder.addCase(fetchChat.fulfilled, (state, action) => {
      state.isListLoading = false;
      state.docs = action.payload;
    });
    builder.addCase(fetchChat.rejected, (state) => {
      state.isListLoading = false;
    });
    builder.addCase(deleteChat.pending, (state, action) => {
      state.docs = state.docs.filter(chat => chat.id !== action.meta.arg);
    });
    builder.addCase(renameChat.pending, (state, action) => {
      const chat = state.docs.find(chat => chat.id === action.meta.arg.id);
      if (!chat) return;
      chat.name = action.meta.arg.name;
    });
    builder.addCase(deleteAllChats.pending, (state) => {
      state.docs = [];
    });
    builder.addCase(sendMessage.pending, (state, action) => {
      state.generateLoadingList.push(action.meta.arg.chatId);
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.generateLoadingList = state.generateLoadingList.filter(id => id !== action.meta.arg.chatId);
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      state.generateLoadingList = state.generateLoadingList.filter(id => id !== action.meta.arg.chatId);
    });
  }
});

export const chatActions = chatSlice.actions;
export const chatReducer = chatSlice.reducer;