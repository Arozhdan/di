import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectLocalSigninError = (state: StateSchema) => state.signinLocal.error