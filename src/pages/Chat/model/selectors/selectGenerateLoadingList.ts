import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectGenerateLoadingList = (state: StateSchema) => state.chat.generateLoadingList;