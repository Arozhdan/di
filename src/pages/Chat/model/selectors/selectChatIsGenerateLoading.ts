import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectChatIsGenerateLoading = (state: StateSchema) => state.chat.isGenerateLoading;