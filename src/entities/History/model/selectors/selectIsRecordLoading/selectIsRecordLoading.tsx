import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectIsRecordLoading = (state: StateSchema) =>
  state.history.isRecordLoading;
