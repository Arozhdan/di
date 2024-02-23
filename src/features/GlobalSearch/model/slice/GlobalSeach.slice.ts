import { createSlice } from "@reduxjs/toolkit"
import { GlobalSearchSchema } from "../types/GlobalSearch.schema"
import { RoutePath } from "@/app/providers/Router"


const initialState: GlobalSearchSchema = {
  sections: [{
    title: 'Navigation',
    pages: [
      {
        label: 'Instruments List',
        url: RoutePath.instruments,
      },
      {
        label: 'History',
        url: RoutePath.history,
      },
      {
        label: "Settings",
        url: RoutePath.profile_settings,
      },
    ]
  }]
}

export const globalSearchSlice = createSlice({
  name: 'globalSearch',
  initialState,
  reducers: {}
})

export const globalSearchReducer = globalSearchSlice.reducer
export const globalSearchActions = globalSearchSlice.actions