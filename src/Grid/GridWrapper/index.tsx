import React, { CSSProperties } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { EditorModeContext } from '../../context';
import '../grid.css';

export type GridWrapperProps = {
  className?: string;
  enabled?: boolean;
  vertical?: boolean;
  stretch?: boolean;
  // Extra customizable parts only for the really picky
  styles?: CSSProperties;
  editorStyles?: CSSProperties;
};

const GridWrapper: React.FC<GridWrapperProps> = ({
  className,
  enabled,
  vertical,
  stretch,
  styles,
  editorStyles,
  children,
}) => (
  <div
    className={`wrapper ${className} ${vertical && 'vertical'} ${stretch &&
      'stretch'}`}
    style={enabled ? editorStyles : styles}
  >
    <DndProvider backend={HTML5Backend}>
      <EditorModeContext.Provider value={{ enabled }}>
        {children}
      </EditorModeContext.Provider>
    </DndProvider>
  </div>
);

export default GridWrapper;
