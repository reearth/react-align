import React, { useMemo, useRef, CSSProperties, useState } from "react";
import { useDrag, useDrop, DragSourceMonitor } from "react-dnd";
// import { DragItem } from "../interfaces";

import Icon from "../../Icon";

import "../grid.scss";

export type ItemProps = {
  id: string;
  index: number;
  expandV?: boolean;
  expandH?: boolean;
  minH?: number;
  maxH?: number;
  minW?: number;
  maxW?: number;
  defaultW: number;
  defaultH: number;
  // x?: number;
  // y?: number;
  draggable: boolean;
  location: { section?: string, area?: string };
  onReorder: (
    originalLocation?: { section?: string, area?: string },
    currentIndex?: number,
    hoverIndex?: number
  ) => void;
  onMoveArea: (
    currentItem?: string,
    dropLocation?: { section?: string, area?: string },
    originalLocation?: { section?: string, area?: string },) => void;
  // Below are extra customizable parts only for the really picky
  iconSize?: number;
};

// MAKE ITEMTYPES GENERIC AND PASSED IN
// MAKE ITEMTYPES GENERIC AND PASSED IN
// MAKE ITEMTYPES GENERIC AND PASSED IN
// MAKE ITEMTYPES GENERIC AND PASSED IN
export const ItemTypes = {
  PLUGIN: "plugin",
  GROUP: "group"
};

const GridItem: React.FC<ItemProps> = ({
  children,
  id,
  index,
  expandV,
  expandH,
  // minH,
  // maxH,
  // minW,
  // maxW,
  // x,
  // y,
  defaultW,
  defaultH,
  draggable,
  location,
  onReorder,
  onMoveArea,
  // Picky options
  iconSize
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setHovered] = useState(false);

  const handleExtend = () => {
    alert("ehy")
  };


  // Drag n drop logic
  const [, drop] = useDrop({
    accept: [ItemTypes.PLUGIN, ItemTypes.GROUP],
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      console.log(hoverBoundingRect, "HOVERBOUNDING")
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      onReorder(location, dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.PLUGIN,
    item: { id, index },
    canDrag: draggable,
    end: (item, monitor) => {
      const dropResults: { dropEffect: string, location: { section?: string, area?: string } } | null = monitor.getDropResult();

      if (dropResults) {
        onMoveArea(item.id, dropResults.location, location)
      }
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
      // blah: monitor.getTargetIds()
    }),
  });

  drag(drop(ref));

  const containerStyles: CSSProperties = useMemo(
    () => ({
      margin: "8px",
      position: "relative",
      width: isHovered ? defaultW >= 70 ? defaultW + "px" : "70px" : defaultW + "px",
      height: isHovered ? defaultH >= 30 ? defaultH + "px" : "30px" : defaultH,
      opacity: isDragging ? 0.5 : 1,
    }),
    [isDragging, isHovered],
  );

  const overlayStyles: CSSProperties = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    background: "rgba(0,0,0,0.6)",
    borderRadius: "5px"
  };

  const buttonStyles: CSSProperties = {
    display: "flex",
    alignItems: "start",
    justifyContent: "space-between",
    width: "60px",
    padding: "6px",
  }

  return (
    <div
      id={id}
      ref={ref}
      className={`item ${(expandV && "expanded-v") || (expandH && "expanded-h")}`}
      style={containerStyles}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      {isHovered && (
        <div style={overlayStyles}>
          <div style={buttonStyles}>
            <Icon name="moveArrows" size={iconSize} />
            <Icon name="horizontalExtend" size={iconSize} onClick={handleExtend} />
          </div>
        </div>
      )}
      {children}
    </div>
  );
};
export default GridItem;
