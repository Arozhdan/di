import { ChatItem } from "./Chat.interface";

export interface ChatSchema {
  docs: ChatItem[];
  activeChat: ChatItem | null;
  isListLoading: boolean;
  isCreateLoading: boolean;
  generateLoadingList: string[];
}