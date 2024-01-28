import { StateSchema } from "@/app/providers/StoreProvider/config/state.schema";
import { Instrument } from "../../types/instrument.interface";

export const selectMostUsedInstrument = (state: StateSchema): Instrument | null => {
  if (!state.instrument.instruments.length) return null;
  if (!state.auth.user?.logs?.length) return null;

  const copy = [...state.auth.user.logs];

  const recentInstrument = copy?.sort((a, b) => {
    return b.timesUsed - a.timesUsed;
  })[0];
  if (!recentInstrument) return null;

  const instrId = recentInstrument?.instrumentId;

  const instrument = state.instrument.instruments.find((instrument) => {
    return instrument.id === instrId;
  });

  if (!instrument) return null;



  return {
    ...instrument,
    timesUsed: recentInstrument.timesUsed,
  }
}