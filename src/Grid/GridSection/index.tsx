import React, { CSSProperties } from "react";
import "../grid.scss";

export type SectionProps = {
  className?: string;
  stretch?: boolean;
  fixedWidth?: number;
  fixedHeight?: number;
  // Extra customizable parts only for the really picky
  styles?: CSSProperties;
};

const GridSection: React.FC<SectionProps> = ({ className, stretch, fixedWidth, fixedHeight, styles, children }) => (
  <div
    className={`${className} section ${stretch && "stretch"}`}
    style={{ ...styles, height: fixedHeight + "px", width: fixedWidth + "px" }}
  >
    {children}
  </div>
);

export default GridSection;
