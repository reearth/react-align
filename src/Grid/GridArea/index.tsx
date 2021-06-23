import React, { CSSProperties, useMemo } from "react";
import { useDrop, DropTargetMonitor } from "react-dnd";
import { Location, ItemProps } from "../GridItem";
import { useContext, ContextType } from "../../contextProvider";
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
  const { editorMode }: ContextType = useContext();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: [ItemTypes.IT3M, ItemTypes.GROUP],
    drop: () => ({ location: location }),
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
    }),
  })
  );

  const buttonStyle: CSSProperties = useMemo(
    () => ({
      position: "absolute",
      left: vertical ? end ? -8 : undefined : "50%",
      right: vertical ? !end ? -8 : undefined : "50%",
      bottom: !vertical && !end ? -8 : vertical ? "50%" : undefined,
      top: vertical ? "50%" : end ? -8 : undefined,
    }), [vertical, end]);

  const mainStyles: CSSProperties = useMemo(
    () => ({
      opacity: isOver ? 0.8 : 1,
      position: "relative"
    }), [isOver]);

  const stylesFromProps: CSSProperties | undefined = editorMode ? styles : undefined;

  const childrenWithParentProps = React.Children.map(
    children, child => React.cloneElement(child as React.ReactElement<ItemProps<Location>>, { end, vertical })
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
            `}
      style={{ ...mainStyles, ...stylesFromProps }}>
      {childrenWithParentProps}
      {(droppable ?? editorMode) && align && (
        <div style={buttonStyle}>
          <Icon
            name={align === "centered" ? "alignCenter" : align === "end" ? "alignEnd" : "alignStart"}
            styles={{ color: iconColor }}
            onClick={onAlignChange}
          />
        </div>
      )}
    </div>
  );
};

export default GridArea;
