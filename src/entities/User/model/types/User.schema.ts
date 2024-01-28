import { User } from "./User.interface";

export interface UserSchema {
  user: User | null
  isLoading: boolean
  error: string | null
  signedIn: boolean | null
}