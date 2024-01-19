import { LucideIcon } from "lucide-react";

interface Page {
  label: string;
  url: string;
  icon: LucideIcon;
}

export interface GlobalSearchSchema {
  sections: {
    title: string;
    pages: Page[];
  }[]
}