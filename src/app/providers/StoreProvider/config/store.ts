import { configureStore, ReducersMapObject } from "@reduxjs/toolkit"
import { To } from "history"
import { NavigateOptions } from "react-router"
import { Reducer } from "redux"
import { CombinedState, StateSchema, ThunkExtraArg } from "./state.schema"
import { createReducerManager } from "./reducerManager"
import { $api } from "@/shared/lib/api"
import { userReducer } from "@/entities/User"
import { globalSearchReducer } from "@/features/GlobalSearch"
import { instrumentReducer } from "@/entities/Instrument"
import { siteSettingsReducer } from "@/entities/SiteSettings"
import { historyReducer } from "@/entities/History"
import { chatReducer } from "@/pages/Chat"
import i18next from "i18next"
import { authLocalReducer } from "@/features/AuthLocal"




export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
  navigate?: (to: To, options?: NavigateOptions) => void,
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    globalSearch: globalSearchReducer,
    auth: userReducer,
    authLocal: authLocalReducer,
    user: userReducer,
    instrument: instrumentReducer,
    siteSettings: siteSettingsReducer,
    history: historyReducer,
    chat: chatReducer
  }

  const reducerManager = createReducerManager(rootReducers)

  const extraArg: ThunkExtraArg = {
    api: $api,
    navigate,
    i18n: i18next
  }

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
      }),
  })

  // @ts-expect-error - this is a hack to get around the fact that the store is not typed to have a reducerManager
  store.reducerManager = reducerManager

  return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"]