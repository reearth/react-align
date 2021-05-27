import React, {useMemo, CSSProperties} from "react";
import { useDrag, DragSourceMonitor } from "react-dnd";
import "../grid.scss";

export type ItemProps = {
  id: string;
  expandV?: boolean;
  expandH?: boolean;
  minH?: number;
  maxH?: number;
  minW?: number;
  maxW?: number;
  defaultW?: number;
  defaultH?: number;
  x?: number;
  y?: number;
  draggable: boolean;
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
  expandV,
  expandH,
  // minH,
  // maxH,
  // minW,
  // maxW,
  x,
  y,
  defaultW,
  defaultH,
  draggable
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.PLUGIN,
    canDrag: draggable,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const containerStyle: CSSProperties = useMemo(
    () => ({
      margin: "2px",
      gridColumn: `${x}/ span ${defaultW}`,
      gridRow: `${y}/ span ${defaultH}`,
      overflow: "hidden",
      whiteSpace: "nowrap",
      opacity: isDragging ? 0.5 : 1,
    }),
    [isDragging],
  );

  return (
    <div
      id={id}
      ref={drag}
      className={`item ${(expandV && "expanded-v") || (expandH && "expanded-h")}`}
      style={containerStyle}>
      {children}
    </div>
  );
};
export default GridItem;
