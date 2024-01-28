import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectCostsSaved = (state: StateSchema, queries?: number) => {
  if (!queries) return null

  const settings = state.siteSettings.data
  if (!settings) return null

  const costsSaved = queries * settings.costPerQuery
  return {
    value: costsSaved,
    average: settings.costPerQuery
  }
}