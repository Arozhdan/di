import { User } from "@/entities/User";

export type InstrumentType = 'business' | 'social' | 'custom' | 'other';

export interface Instrument {
  id: string;
  name: string;
  intro: string;
  description: string;
  example: string;
  prompt: string;
  createdAt: string;
  updatedAt: string;
  instrumentType: InstrumentType;
  owner?: User;
  timesUsed?: number;
}