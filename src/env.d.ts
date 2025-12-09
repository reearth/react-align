/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module "*.svg" {
  import type React from "react";

  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: React.FC<React.SVGProps<SVGSVGElement>>;
  export default src;
}
