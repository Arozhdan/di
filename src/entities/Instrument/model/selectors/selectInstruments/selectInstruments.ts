import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectInstruments = (state: StateSchema) => {
  const filters = state.instrument.filters;
  if (!filters) return state.instrument.instruments;
  const instruments = state.instrument.instruments.filter(instrument => {
    if (filters.name && !instrument.name.toLowerCase().includes(filters.name.toLowerCase())) return false;
    if (filters.types && filters.types.length && !filters.types.includes(instrument.instrumentType)) return false;
    return true;
  });
  if (filters.onlyFavourites) {
    const userFavourites = state.user.user?.favoriteInstruments || [];
    return instruments.filter(instrument => userFavourites.some(favourite => favourite.id === instrument.id));
  }
  return instruments;
};