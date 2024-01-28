import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectSiteSettings = (state: StateSchema) => state.siteSettings.data;