import { createSlice } from "@reduxjs/toolkit"
import { GlobalSearchSchema } from "../types/GlobalSearch.schema"
import { RoutePath } from "@/app/providers/Router"
import { BookMarkedIcon, BotIcon, PencilRulerIcon, Settings2Icon } from "lucide-react"



const initialState: GlobalSearchSchema = {
  sections: [{
    title: 'Navigation',
    pages: [
      {
        label: 'Instruments List',
        url: RoutePath.instruments,
        icon: BotIcon
      },
      {
        label: 'History',
        url: RoutePath.history,
        icon: BookMarkedIcon
      },
      {
        label: "Templates",
        url: RoutePath.templates,
        icon: PencilRulerIcon,
      },
      {
        label: "Settings",
        url: RoutePath.profile_settings,
        icon: Settings2Icon,
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