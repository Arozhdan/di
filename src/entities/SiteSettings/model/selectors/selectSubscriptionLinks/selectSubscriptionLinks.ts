import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectSubscriptionLinks = (state: StateSchema) => {
  return state.siteSettings.data?.subscriptionsLinks || [];
}