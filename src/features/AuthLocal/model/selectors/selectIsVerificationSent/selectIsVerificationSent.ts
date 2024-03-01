import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectIsVerificationSent = (state: StateSchema) => state.authLocal.verificatioSent === true;