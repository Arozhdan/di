import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectChatIsCreateLoading = (state: StateSchema) => state.chat.isCreateLoading;