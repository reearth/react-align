import React from "react";

import Icons from "./icons";

export type IconKeys = keyof typeof Icons;

export type IconProps = {
  className?: string;
  name: string | IconKeys;
  onClick?: () => void;
};

const Icon: React.FC<IconProps> = ({ className, name, onClick }) => {
  const LocalIconComponent = Icons[name as IconKeys] as unknown as React.FC<
    React.SVGProps<SVGSVGElement>
  >;
  return <LocalIconComponent className={className} onClick={onClick} />;
};

export default Icon;
