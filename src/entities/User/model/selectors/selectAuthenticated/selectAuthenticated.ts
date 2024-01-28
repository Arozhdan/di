import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectAuthenticated = (state: StateSchema) => state.auth.signedIn === true