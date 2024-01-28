interface Page {
  label: string;
  url: string;
}

export interface GlobalSearchSchema {
  sections: {
    title: string;
    pages: Page[];
  }[]
}