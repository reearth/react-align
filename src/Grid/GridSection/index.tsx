import React, { CSSProperties } from 'react';
import { useEditorMode } from '../../context';
import '../grid.css';

export type GridSectionProps = {
  className?: string;
  horizontal?: boolean;
  stretch?: boolean;
  fixedWidth?: number;
  fixedHeight?: number;
  // Extra customizable parts only for the really picky
  styles?: CSSProperties;
  editorStyles?: CSSProperties;
};

const GridSection: React.FC<GridSectionProps> = ({
  className,
  horizontal,
  stretch,
  fixedWidth,
  fixedHeight,
  styles,
  editorStyles,
  children,
}) => {
  const { enabled } = useEditorMode();
  const stylesFromProps: CSSProperties | undefined = enabled
    ? editorStyles
    : styles;

  return (
    <div
      className={`section ${className} ${horizontal &&
        'horizontal'} ${stretch && 'stretch'}`}
      style={{
        ...stylesFromProps,
        height: fixedHeight + 'px',
        width: fixedWidth + 'px',
      }}
    >
      {children}
    </div>
  );
};

export default GridSection;
