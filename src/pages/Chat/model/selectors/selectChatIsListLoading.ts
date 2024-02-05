import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectChatIsListLoading = (state: StateSchema) => state.chat.isListLoading;