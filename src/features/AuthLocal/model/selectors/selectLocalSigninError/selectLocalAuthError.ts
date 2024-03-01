import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectLocalAuthError = (state: StateSchema) => state.authLocal.error