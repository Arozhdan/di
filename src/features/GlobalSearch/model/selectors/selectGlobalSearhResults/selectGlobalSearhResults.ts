import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema"

export const selectGlobalSearch = (state: StateSchema) => state.globalSearch?.sections ?? []