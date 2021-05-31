import React, { useMemo, useRef, CSSProperties } from "react";
import { useDrag, useDrop, DragSourceMonitor, DropTargetMonitor } from "react-dnd";
import { DragItem } from "../interfaces";
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
  defaultW?: number;
  defaultH?: number;
  // x?: number;
  // y?: number;
  draggable: boolean;
  locationName: { section?: string, area?: string };
  onMove: (
    currentItem?: string,
    currentIndex?: number,
    hoverIndex?: number,
    dropLocation?: { section?: string, area?: string },
    originalLocation?: { section?: string, area?: string }
  ) => void;
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
  locationName,
  onMove
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.PLUGIN,
    item: { id, index },
    canDrag: draggable,
    end: (item, monitor) => {
      const dropResults: { dropEffect: string, area: { section?: string, area?: string } } | null = monitor.getDropResult();

      if (!dropResults?.area) return;
      onMove(item.id, undefined, undefined, dropResults.area, locationName)
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
      // blah: monitor.getTargetIds()
    }),
  }));

  const [, drop] = useDrop({
    accept: [ItemTypes.PLUGIN, ItemTypes.GROUP],
    hover(item: DragItem, monitor: DropTargetMonitor) {
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
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      onMove(item.id, dragIndex, hoverIndex, undefined, locationName);

      item.index = hoverIndex;
    },
  });

  drag(drop(ref))

  const containerStyle: CSSProperties = useMemo(
    () => ({
      margin: "2px",
      width: defaultW + "px",
      height: defaultH + "px",
      opacity: isDragging ? 0.5 : 1,
    }),
    [isDragging],
  );

  return (
    <div
      id={id}
      ref={ref}
      className={`item ${(expandV && "expanded-v") || (expandH && "expanded-h")}`}
      style={containerStyle}>
      {children}
    </div>
  );
};
export default GridItem;
