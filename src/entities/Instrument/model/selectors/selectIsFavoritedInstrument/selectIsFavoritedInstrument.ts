import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectIsFavoritedInstrument = (state: StateSchema, instrumentId?: string) =>
  state.user?.user?.favoriteInstruments?.some(
    (instrument) => instrument.id === instrumentId
  ) || false