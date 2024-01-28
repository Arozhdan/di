import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectHistoryFilters = (state: StateSchema) => state.history.filters