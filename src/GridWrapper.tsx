import React, { CSSProperties, useCallback, useState } from 'react';
import {
  DragDropContext,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd';

import { Context } from './context';
import { Alignment } from './GridArea';
import './grid.css';

export type GridWrapperProps = {
  className?: string;
  editing?: boolean;
  vertical?: boolean;
  stretch?: boolean;
  /** Extra customizable parts only for the really picky */
  style?: CSSProperties;
  editorStyle?: CSSProperties;
  onMove?: (
    id: string,
    destAreaId: string,
    destIndex: number,
    prevAreaId: string,
    prevIndex: number
  ) => void;
  onAlignChange?: (areaId: string, align: Alignment) => void;
  onExtend?: (id: string, extended: boolean) => void;
};

const GridWrapper: React.FC<GridWrapperProps> = ({
  className,
  editing,
  vertical,
  stretch,
  style,
  editorStyle,
  children,
  onMove,
  onAlignChange,
  onExtend,
}) => {
  const [isDragging, setDragging] = useState(false);

  const handleDragStart = useCallback(() => {
    setDragging(true);
  }, []);

  const handleDragEnd = useCallback(
    (result: DropResult, _provided: ResponderProvided) => {
      setDragging(false);
      if (
        !result.destination ||
        result.reason !== 'DROP' ||
        (result.destination.droppableId === result.source.droppableId &&
          result.destination.index === result.source.index)
      )
        return;
      onMove?.(
        result.draggableId,
        result.destination.droppableId,
        result.destination.index,
        result.source.droppableId,
        result.source.index
      );
    },
    [onMove]
  );

  return (
    <div
      className={`wrapper ${className} ${vertical && 'vertical'} ${stretch &&
        'stretch'}`}
      style={editing ? editorStyle : style}
    >
      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Context.Provider
          value={{ editing: !!editing, onAlignChange, onExtend, isDragging }}
        >
          {children}
        </Context.Provider>
      </DragDropContext>
    </div>
  );
};

export default GridWrapper;
