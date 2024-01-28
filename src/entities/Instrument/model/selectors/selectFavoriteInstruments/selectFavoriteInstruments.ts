import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectFavoriteInstruments = (state: StateSchema) => state.user.user?.favoriteInstruments || [];