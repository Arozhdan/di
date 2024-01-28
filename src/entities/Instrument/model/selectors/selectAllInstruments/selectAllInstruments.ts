import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectAllInstruments = (state: StateSchema) => state.instrument.instruments