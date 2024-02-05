import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectActiveChat = (state: StateSchema) => state.chat.activeChat;