declare module "*.module.css"

declare const __IS_DEV__: boolean
declare const __API__: string
declare const __SERVER__: string

declare module '*.svg' {
  import React from 'react';

  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;

 
type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T;
};