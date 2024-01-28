import { History } from './History.interface'

export interface HistoryFilters {
  instruments?: string[]
  pinnedOnly?: boolean
  input?: string
}

export interface HistorySchema {
  docs: History[]
  isListLoading: boolean
  filters: HistoryFilters | null
  isRecordLoading: boolean
  isGenerating: boolean
}