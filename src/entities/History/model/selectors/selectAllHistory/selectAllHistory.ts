import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectAllHistory = (state: StateSchema) => state.history.docs;