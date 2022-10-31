import { CSSProperties, ReactNode } from "react";

import { useAlignContext } from "./context";
import "./grid.css";

export type GridSectionProps = {
  className?: string;
  children?: ReactNode;
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
  children,
  horizontal,
  stretch,
  fixedWidth,
  fixedHeight,
  style,
  editorStyle,
}) => {
  const { editing: enabled } = useAlignContext();

  return (
    <div
      className={`section ${className} ${horizontal ? "horizontal" : ""} ${
        stretch ? "stretch" : ""
      }`}
      style={{
        ...(enabled ? editorStyle : style),
        ...(typeof fixedHeight === "number"
          ? {
              height: fixedHeight + "px",
            }
          : {}),
        ...(typeof fixedWidth === "number"
          ? {
              width: fixedWidth + "px",
            }
          : {}),
      }}>
      {children}
    </div>
  );
};

export default GridSection;
