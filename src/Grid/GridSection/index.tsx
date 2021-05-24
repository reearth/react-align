import React from "react";
import "../grid.scss";

export type SectionProps = {
  middle?: boolean;
  fixedWidth?: number;
  fixedHeight?: number;
};

const GridSection: React.FC<SectionProps> = ({ middle, fixedWidth, fixedHeight, children }) => (
  <div
    className={`section ${middle && "middle"}`}
    style={{ height: fixedHeight + "px", width: fixedWidth + "px" }}>
    {children}
  </div>
);

export default GridSection;
