import React, { CSSProperties } from 'react';

import { useAlignContext } from './context';
import './grid.css';

export type GridSectionProps = {
  className?: string;
  horizontal?: boolean;
  stretch?: boolean;
  fixedWidth?: number;
  fixedHeight?: number;
  /** Extra customizable parts only for the really picky */
  style?: CSSProperties;
  editorStyle?: CSSProperties;
};

const GridSection: React.FC<GridSectionProps> = ({
  className,
  horizontal,
  stretch,
  fixedWidth,
  fixedHeight,
  style,
  editorStyle,
  children,
}) => {
  const { editing: enabled } = useAlignContext();

  return (
    <div
      className={`section ${className} ${horizontal ? 'horizontal' : ''} ${
        stretch ? 'stretch' : ''
      }`}
      style={{
        ...(enabled ? editorStyle : style),
        ...(typeof fixedHeight === 'number'
          ? {
              height: fixedHeight + 'px',
            }
          : {}),
        ...(typeof fixedWidth === 'number'
          ? {
              width: fixedWidth + 'px',
            }
          : {}),
      }}
    >
      {children}
    </div>
  );
};

export default GridSection;
