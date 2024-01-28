import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectRecentInstruments = (state: StateSchema) => {
  if (!state.user.user?.logs?.length) return []

  const instruments = [...state.user.user.logs]
  const instrumentIds = instruments.sort((a, b) => {
    const dateA = new Date(a.dateLastUsed).getTime()
    const dateB = new Date(b.dateLastUsed).getTime()
    return dateB - dateA
  }).map(log => log.instrumentId).slice(0, 8)

  return state.instrument.instruments.filter(instrument => instrumentIds.includes(instrument.id))
}