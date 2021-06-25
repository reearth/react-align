import React, { CSSProperties } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useContext, EditorModeContextType } from "../../contextProvider";
import "../grid.css";

export type WrapperProps = {
  className?: string;
  vertical?: boolean;
  stretch?: boolean;
  // Extra customizable parts only for the really picky
  styles?: CSSProperties;
  editorStyles?: CSSProperties;
};

const GridWrapper: React.FC<WrapperProps> = ({ className, vertical, stretch, styles, editorStyles, children }) => {
  const { editorMode }: EditorModeContextType = useContext();

  return (
    <div
      className={`wrapper ${className} ${vertical && "vertical"} ${stretch && "stretch"}`}
      style={editorMode ? editorStyles : styles}>
      <DndProvider backend={HTML5Backend}>
        {children}
      </DndProvider>
    </div>
  )
};

export default GridWrapper;
