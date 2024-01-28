import { Instrument } from "@/entities/Instrument"

interface Logs {
  instrumentId: string
  instrumentName: string
  dateLastUsed: string
  timesUsed: number
}

export interface User {
  id: string
  roles: string[]
  email: string
  createdAt: string
  updatedAt: string
  favoriteInstruments: Instrument[]
  notifications: Notifications
  prefersDarkMode: boolean
  address: string
  firstName: string
  lastName: string
  phone: string
  loginAttempts: number
  logs?: Logs[]
  monthlyUsage?: number
  totalUsage?: number

}

export interface Notifications {
  communicationEmails: boolean
  marketingEmails: boolean
  socialMediaAds: boolean
  securityEmails: boolean
  pushNotifications: boolean
}