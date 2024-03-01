import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectIsLocalSigninLoading = (state: StateSchema) => state.authLocal.isLoading