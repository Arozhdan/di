import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

interface Data {
  value: number;
  average: number;
}
export const selectTimeSaved = (state: StateSchema, total?: number): Data | null => {
  if (!total) return null

  const settings = state.siteSettings.data
  if (!settings) return null
  const timeSaved = Math.ceil(total * settings.timePerQuery / 60)
  return {
    value: timeSaved,
    average: settings.timePerQuery
  }
}