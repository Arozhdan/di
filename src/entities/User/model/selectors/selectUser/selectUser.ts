import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectUser = (state: StateSchema) => state.auth.user;