import { Billing } from "./Billing.interface";
import { Subscription } from "./Subscription.interface";

export interface SubscriptionSchema {
  data: Subscription | null;
  loading: boolean;
  billing: Billing[];
  error: string | null;
}
