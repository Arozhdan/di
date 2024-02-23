import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectHistoryIsLoading = (state: StateSchema) =>
  state.history.isListLoading;
