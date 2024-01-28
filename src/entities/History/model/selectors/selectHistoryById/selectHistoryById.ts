import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectHistoryById = (state: StateSchema, id?: string) => {
  if (!id) return null;
  return state.history.docs.find(history => history.id === id) || null;
}