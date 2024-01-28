import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectHistoryByInstrument = (state: StateSchema, instrument?: string) => {
  if (!instrument) return state.history.docs;
  return state.history.docs.filter((history) => history.instrument.id === instrument) || [];
}