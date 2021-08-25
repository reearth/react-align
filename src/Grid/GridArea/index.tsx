import React, { CSSProperties, useMemo } from "react";
import { useDrop, DropTargetMonitor } from "react-dnd";
import { Location, ItemProps } from "../GridItem";
import { useEditorMode } from "../../context";
import Icon from "../../Icon";
import "../grid.css";

import { ItemTypes } from "../GridItem";

export type Alignments = "start" | "end" | "centered";

export type AreaProps<T extends Location> = {
  className?: string;
  vertical?: boolean;
  reverse?: boolean;
  stretch?: boolean;
  end?: boolean;
  droppable?: boolean; // optional to override editorMode context (enabled param passed to GridWrapper) **Needs to be accompanied with GridItems draggable prop**
  align?: Alignments;
  setAlign?: React.Dispatch<React.SetStateAction<Alignments>>;
  location: T;
  // Extra customizable parts only for the really picky
  styles?: CSSProperties;
  editorStyles?: CSSProperties;
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
  setAlign,
  location,
  children,
  // Picky stuff
  styles,
  editorStyles,
  iconColor = "#FFFFFF"
}) => {
  const { enabled } = useEditorMode();

  const onAlignChange = (align?: Alignments, setAlign?: React.Dispatch<React.SetStateAction<Alignments>>) => {
    if (!align || !setAlign) return;

    switch (align) {
      case "start":
        setAlign("centered");
        break;
      case "centered":
        setAlign("end");
        break;
      default:
        setAlign("start");
        break;
    }
  };

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
      opacity: (droppable ?? enabled) && align ? 1 : 0,
      transition: "all 0.5s ease-in-out"
    }), [vertical, end, droppable, enabled, align]);

  const mainStyles: CSSProperties = useMemo(
    () => ({
      opacity: isOver ? 0.8 : 1,
      minHeight: !React.Children.count(children) && !enabled ? "0px" : "26px",
      minWidth: !React.Children.count(children) && !enabled ? "0px" : "46px"
    }), [isOver, children, enabled]);

  const stylesFromProps: CSSProperties | undefined = enabled ? editorStyles : styles;
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
      ${enabled ? "area-transition-in" : "area-transition-out"}
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
          styles={{ color: iconColor, cursor: (droppable ?? enabled) && align && !!React.Children.count(children) ? "pointer" : "default" }}
          onClick={(droppable ?? enabled) && align && !!React.Children.count(children) ? () => onAlignChange(align, setAlign) : undefined}
        />
      </div>
    </div>
  );
};

export default GridArea;
