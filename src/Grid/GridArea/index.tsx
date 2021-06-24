import React, { CSSProperties, useEffect, useMemo } from "react";
import { useDrop, DropTargetMonitor } from "react-dnd";
import { Location, ItemProps } from "../GridItem";
import { useContext, EditorModeContextType } from "../../contextProvider";
import Icon from "../../Icon";
import "../grid.scss";

import { ItemTypes } from "../GridItem";

export type Alignments = "start" | "end" | "centered";

export type AreaProps<T extends Location> = {
  className?: string;
  vertical?: boolean;
  reverse?: boolean;
  stretch?: boolean;
  end?: boolean;
  droppable?: boolean; // optional to override or not use editorMode context **Needs to be accompanied with GridItems draggable prop**
  align?: Alignments;
  onAlignChange?: () => void;
  location: T;
  // Extra customizable parts only for the really picky
  styles?: CSSProperties;
  iconColor?: string;
};

const GridArea: React.FC<AreaProps<Location>> = ({
  className,
  vertical,
  reverse,
  stretch,
  end,
  droppable,
  align,
  onAlignChange,
  location,
  children,
  // Picky stuff
  styles,
  iconColor = "#FFFFFF"
}) => {
  const { editorMode }: EditorModeContextType = useContext();

  // ***************************************
  // Drop logic
  const [{ isOver }, drop] = useDrop(() => ({
    accept: [ItemTypes.IT3M, ItemTypes.GROUP],
    drop: () => ({ location: location }),
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
    }),
  })
  );
  // ***************************************

  // ***************************************
  // Internal styles used
  const buttonStyle: CSSProperties = useMemo(
    () => ({
      position: "absolute",
      left: vertical ? end ? 0 : undefined : "50%",
      right: vertical ? !end ? 0 : undefined : "50%",
      bottom: !vertical && !end ? 0 : vertical ? "50%" : undefined,
      top: vertical ? "50%" : end ? 0 : undefined,
      opacity: (droppable ?? editorMode) && align ? 1 : 0,
      transition: "all 0.5s ease-in-out"
    }), [vertical, end, droppable, editorMode, align]);

  const mainStyles: CSSProperties = useMemo(
    () => ({
      opacity: isOver ? 0.8 : 1,
      minHeight: !React.Children.count(children) && !editorMode ? "0px" : "26px",
      minWidth: !React.Children.count(children) && !editorMode ? "0px" : "46px"
    }), [isOver, children, editorMode]);

  const stylesFromProps: CSSProperties | undefined = editorMode ? styles : undefined;
  // ***************************************

  // Rebuilds the GridItem children to receive their parent GridArea's 'end' and 'vertical' values.
  // Used to know where to align the overlay buttons (end) and how to extend the GridItems (vertical).
  const childrenWithParentProps = React.Children.map(
    children, child => React.cloneElement(child as React.ReactElement<ItemProps<Location>>, { end, vertical, location })
  );

  return (
    <div
      ref={drop}
      className={`
      ${className} 
      area 
      ${stretch && "stretch"} 
      ${end && "end"} 
      ${align === "centered" ? "just-centered" : align === "end" ? "just-end" : "start"}
      ${vertical
          ? reverse
            ? "vertical-r"
            : "vertical"
          : reverse
            ? "horizontal-r"
            : "horizontal"
        }
      ${editorMode ? "area-transition-in" : "area-transition-out"}
      `}
      style={{ ...mainStyles, ...stylesFromProps }}>
      {childrenWithParentProps}
      <div style={buttonStyle}>
        <Icon
          name={
            align === "centered"
              ? vertical
                ? "alignCenterV"
                : "alignCenter"
              : align === "end"
                ? vertical
                  ? "alignEndV"
                  : "alignEnd"
                : vertical
                  ? "alignStartV"
                  : "alignStart"}
          styles={{ color: iconColor, cursor: (droppable ?? editorMode) && align && !!React.Children.count(children) ? "pointer" : "default" }}
          onClick={(droppable ?? editorMode) && align && !!React.Children.count(children) ? onAlignChange : undefined}
        />
      </div>
    </div>
  );
};

export default GridArea;
