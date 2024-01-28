import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectAuthInited = (state: StateSchema) => state.auth.signedIn !== null;