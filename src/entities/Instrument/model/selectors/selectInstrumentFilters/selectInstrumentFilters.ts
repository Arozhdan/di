import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectInstrumentFilters = (state: StateSchema) => state.instrument.filters;