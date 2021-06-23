import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "../grid.scss";

export type WrapperProps = {
  vertical?: boolean;
  stretch?: boolean;
};

const GridWrapper: React.FC<WrapperProps> = ({ vertical, stretch, children }) => (
  <div className={`wrapper ${vertical && "vertical"} ${stretch && "stretch"}`}>
    <DndProvider backend={HTML5Backend}>
      {children}
    </DndProvider>
  </div>
);

export default GridWrapper;
