declare module "*.svg?react" {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
