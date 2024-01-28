import { Instrument } from "@/entities/Instrument"
import { User } from "@/entities/User"

export interface History {
  id: string
  input: string
  output: string
  owner: User
  instrument: Instrument
  isPinned: boolean
  createdAt: string
  updatedAt: string
}