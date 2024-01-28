import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectTotalNumberQueries = (state: StateSchema) => {
  if (!state.user.user?.logs?.length) return 0
  return state.user.user.logs.reduce((acc, log) => {
    return acc + log.timesUsed
  }, 0)
}