import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";



export const selectHistory = (state: StateSchema) => {
  const filters = state.history.filters;
  if (!filters) return state.history.docs;
  const history = state.history.docs.filter(history => {
    if (filters.input && !history.input.includes(filters.input)) return false;
    if (filters.instruments && filters.instruments.length && !filters.instruments.includes(history.instrument.id)) return false;
    if (filters.pinnedOnly && !history.isPinned) return false;
    return true;
  });

  return history;
}