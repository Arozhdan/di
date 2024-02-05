import {
  type AnyAction,
  type EnhancedStore,
  type Reducer,
  type ReducersMapObject,
} from "@reduxjs/toolkit"
import { type NavigateOptions, type To } from "react-router-dom"

import type { AxiosInstance } from "axios"
import { GlobalSearchSchema } from "@/features/GlobalSearch"
import { UserSchema } from "@/entities/User"
import { SigninLocalSchema } from "@/features/AuthLocal"
import { InstrumentSchema } from "@/entities/Instrument"
import { SiteSettingsSchema } from "@/entities/SiteSettings"
import { HistorySchema } from "@/entities/History"
import { ChatSchema } from "@/pages/Chat"

export type CombinedState<S> = {
  [K in keyof S]: S[K]
}


export interface StateSchema {
  globalSearch: GlobalSearchSchema
  auth: UserSchema
  signinLocal: SigninLocalSchema
  user: UserSchema
  instrument: InstrumentSchema
  siteSettings: SiteSettingsSchema
  history: HistorySchema
  chat: ChatSchema
}
export type StateSchemaKey = keyof StateSchema
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void
  getMountedReducers: () => MountedReducers
}
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}

export interface ThunkExtraArg {
  api: AxiosInstance
  navigate?: (to: To, options?: NavigateOptions) => void
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArg
  state: StateSchema
}