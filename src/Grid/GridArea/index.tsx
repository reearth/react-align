import React, { CSSProperties, useMemo } from "react";
import { useDrop, DropTargetMonitor } from "react-dnd";
import { Location, ItemProps } from "../GridItem";
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
  align,
  onAlignChange,
  location,
  children,
  // Picky stuff
  styles,
  iconColor = "#FFFFFF"
}) => {

  const [{ isOver }, drop] = useDrop(() => ({
    accept: [ItemTypes.IT3M, ItemTypes.GROUP],
    drop: () => ({ location: location }),
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
      draggingItem: monitor.getItemType() as string,
    }),
  })
  );

  const buttonStyle: CSSProperties = useMemo(
    () => ({
      position: "absolute",
      left: vertical && !end ? undefined : 0,
      right: vertical && end ? undefined : 0,
      bottom: 0,
      top: vertical ? 0 : undefined,
      marginLeft: vertical ? 0 : "auto",
      marginRight: vertical ? 0 : "auto",
      marginTop: vertical ? "auto" : 0,
      marginBottom: vertical ? "auto" : 0,
      display: "flex",
      flexDirection: vertical ? "column" : "row",
      justifyContent: "center",
    }), [vertical, end]);

  const mainStyles: CSSProperties = useMemo(
    () => ({
      opacity: isOver ? 0.8 : 1,
      position: "relative"
    }), [isOver]);

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
      style={{ ...mainStyles, ...styles }}>
      {childrenWithParentProps}
      {align && (
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
