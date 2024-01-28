import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";

export const selectInstrumentTypes = (state: StateSchema) => state.instrument.instruments.reduce((acc, curr) => {
  if (acc.indexOf(curr.instrumentType) === -1) {
    acc.push(curr.instrumentType);
  }
  return acc;
}, [] as string[]); 
