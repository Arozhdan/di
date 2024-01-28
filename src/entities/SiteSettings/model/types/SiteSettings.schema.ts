import { SiteSettings } from "./SiteSettings.interface"

export interface SiteSettingsSchema {
  isLoaded: boolean
  error: string | null
  data: SiteSettings | null
}