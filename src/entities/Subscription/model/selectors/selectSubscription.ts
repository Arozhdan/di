import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectSubscription = (state: StateSchema) => state.subscription.data;