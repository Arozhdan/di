import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectIsSiteSettingsLoaded = (state: StateSchema) => state.siteSettings.isLoaded;