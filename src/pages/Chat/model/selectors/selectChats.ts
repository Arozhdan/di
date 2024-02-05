import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectChats = (state: StateSchema) => {
  const copy = state.chat.docs.slice();
  copy.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  return copy;
}