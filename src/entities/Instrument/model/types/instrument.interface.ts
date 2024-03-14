import { User } from "@/entities/User";


export interface Instrument {
  id: string;
  name: string;
  help?: string;
  intro: string;
  description: string;
  example: string;
  prompt: string;
  createdAt: string;
  updatedAt: string;
  instrumentType: string;
  owner?: User;
  timesUsed?: number;
}