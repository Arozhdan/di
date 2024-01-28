export interface SiteSettings {
  privacyPolicyUrl: string
  termsOfUseUrl: string
  email: string
  telegram: string
  releaseNotes: any[]
  subscriptionsLinks: SubscriptionsLink[]
  costPerQuery: number
  timePerQuery: number
  id: string
}

export interface SubscriptionsLink {
  tier: Tier
  url: string
  price: number
  currency: string
  isFeatured: boolean
  id: string
}

export interface Tier {
  id: string
  createdAt: string
  updatedAt: string
  allowChat: boolean
  allowTemplates: boolean
}

export interface Description {
  children: any[]
  type: string
}