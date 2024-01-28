import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectInstrumentById = (state: StateSchema, id?: string) =>
  !id ? null :
    state.instrument.instruments.find(instrument => instrument.id === id) || null;