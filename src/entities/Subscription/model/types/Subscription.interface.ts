import { User } from "@/entities/User"

export interface Subscription {
  id: string
  name: string
  owner: User
  active: boolean
  startDate: string
  endDate: string
  nextPaymentDate: string
  lastPaymentDate: string
  isPro: boolean
  createdAt: string
  updatedAt: string
  tier: Tier
  price: string
  freeTrial: boolean
}


export interface Tier {
  id: string
  name: string
  allowance: number
  allowChat: boolean
  allowTemplates: boolean
  createdAt: string
  updatedAt: string
}
