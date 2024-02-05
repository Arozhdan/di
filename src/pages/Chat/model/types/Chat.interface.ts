import { User } from "@/entities/User";

export interface ChatItem {
  id: string;
  name: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
  owner: User;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}