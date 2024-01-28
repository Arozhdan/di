import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const isGenerating = (state: StateSchema) => state.instrument.isGenerating