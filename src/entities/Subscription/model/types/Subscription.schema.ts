import { Subscription } from "./Subscription.interface";

export interface SubscriptionSchema {
  data: Subscription | null;
  loading: boolean;
  error: string | null;
}
