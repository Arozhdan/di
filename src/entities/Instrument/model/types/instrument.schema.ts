import { Instrument } from "./instrument.interface";

export interface InstrumentFilters {
  name?: string
  types?: Instrument['instrumentType'][];
  onlyFavourites?: boolean;
}

export interface InstrumentSchema {
  isListLoading: boolean;
  isListError: boolean;
  instruments: Instrument[];
  filters: InstrumentFilters | null;
  isGenerating?: boolean;
}