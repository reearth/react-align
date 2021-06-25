import React, { CSSProperties } from "react";
import { useContext, EditorModeContextType } from "../../contextProvider";
import "../grid.css";

export type SectionProps = {
  className?: string;
  horizontal?: boolean;
  stretch?: boolean;
  fixedWidth?: number;
  fixedHeight?: number;
  // Extra customizable parts only for the really picky
  styles?: CSSProperties;
  editorStyles?: CSSProperties;
};

const GridSection: React.FC<SectionProps> = ({
  className,
  horizontal,
  stretch,
  fixedWidth,
  fixedHeight,
  styles,
  editorStyles,
  children }) => {
  const { editorMode }: EditorModeContextType = useContext();
  const stylesFromProps: CSSProperties | undefined = editorMode ? editorStyles : styles;

  return (
    <div
      className={`section ${className} ${horizontal && "horizontal"} ${stretch && "stretch"}`}
      style={{ ...stylesFromProps, height: fixedHeight + "px", width: fixedWidth + "px" }}
    >
      {children}
    </div>
  )
};

export default GridSection;
