import React from 'react';

import Icons from './icons';

export type Icons = keyof typeof Icons;

export type IconProps = {
  className?: string;
  name: string | Icons;
  onClick?: () => void;
};

const Icon: React.FC<IconProps> = ({ className, name, onClick }) => {
  const LocalIconComponent = Icons[name as Icons];
  return <LocalIconComponent className={className} onClick={onClick} />;
};

export default Icon;
