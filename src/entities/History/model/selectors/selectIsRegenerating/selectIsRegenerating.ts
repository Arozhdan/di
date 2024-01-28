import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectIsRegenerating = (state: StateSchema) => state.history.isGenerating;