import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectIsInstrumentsListLoading = (state: StateSchema) => state.instrument.isListLoading;