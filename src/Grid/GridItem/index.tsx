import React, { useMemo, useRef, CSSProperties, useState } from "react";
import { useDrag, useDrop, DragSourceMonitor } from "react-dnd";
import { DragItem } from "../interfaces";

import Icon from "../../Icon";

import "../grid.scss";

export type Location = { section?: string, area?: string };

export type ItemProps<T extends Location> = {
  id: string;
  index: number;
  expandable?: boolean;
  expandV?: boolean;
  expandH?: boolean;
  minH: number;
  maxH: number;
  defaultH?: number;
  minW: number;
  maxW: number;
  defaultW?: number;
  draggable: boolean;
  location: T;
  onReorder: (
    originalLocation?: T,
    currentIndex?: number,
    hoverIndex?: number
  ) => void;
  onMoveArea: (
    currentItem?: string,
    dropLocation?: T,
    originalLocation?: T
  ) => void;
  // props passed from parent
  end?: boolean;
  vertical?: boolean;
  // Below are extra customizable parts only for the really picky
  iconSize?: number;
};

export const ItemTypes = {
  IT3M: "it3m",
  GROUP: "group"
};

const GridItem: React.FC<ItemProps<Location>> = ({
  children,
  id,
  index,
  expandable,
  expandV,
  expandH,
  minH,
  maxH,
  defaultH,
  minW,
  maxW,
  defaultW,
  draggable,
  location,
  onReorder,
  onMoveArea,
  // passed from parent
  end,
  vertical,
  // Picky options
  iconSize
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setHovered] = useState(false);
  const [isExpanded, setExpanded] = useState(false);

  const handleExtend = () => {
    if (!expandable) return;
    setExpanded(!isExpanded);
  };

  // Drag n drop logic
  const [{ handlerId }, drop] = useDrop({
    accept: [ItemTypes.IT3M, ItemTypes.GROUP],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.bottom) / 2;

      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      onReorder(location, dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.IT3M,
    item: { id, index },
    canDrag: draggable,
    end: (item, monitor) => {
      const dropResults: { location: Location } | null = monitor.getDropResult();

      if (dropResults) {
        onMoveArea(item.id, dropResults.location, location)
      }
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  preview(drop(ref));

  const containerStyles: CSSProperties = useMemo(
    () => ({
      margin: "8px",
      position: "relative",
      width: !vertical && isExpanded ? "100%" : defaultW ? defaultW : undefined,
      minWidth: isHovered && minW && minW <= 70 ? "70px" : minW + "px",
      maxWidth: !vertical && isExpanded ? "100%" : isHovered && maxW && maxW <= 70 ? "70px" : maxW + "px",
      height: vertical && isExpanded ? "100%" : defaultH ? defaultH : undefined,
      minHeight: isHovered && minH && minH <= 30 ? "30px" : minH + "px",
      maxHeight: vertical && isExpanded ? "100%" : isHovered && maxH && maxH <= 30 ? "30px" : maxH + "px",
      opacity: isDragging ? 0.5 : 1,
    }),
    [isDragging, isHovered, isExpanded],
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
    alignItems: end ? "end" : "start",
    justifyContent: "space-between",
    width: "60px",
    padding: "6px",
    float: end ? "right" : "left",
    background: "red"
  };

  return (
    <div
      id={id}
      ref={ref}
      data-handler-id={handlerId}
      className={`item ${(expandV && "expanded-v") || (expandH && "expanded-h")}`}
      style={containerStyles}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      {isHovered && (
        <div style={overlayStyles}>
          <div style={buttonStyles}>
            <div ref={drag}>
              <Icon name="moveArrows" size={iconSize} />
            </div>
            {expandable && !vertical && <Icon name="horizontalExtend" size={iconSize} onClick={handleExtend} />}
            {expandable && vertical && <Icon name="verticalExtend" size={iconSize} onClick={handleExtend} />}
          </div>
        </div>
      )}
      {children}
    </div>
  );
};
export default GridItem;
