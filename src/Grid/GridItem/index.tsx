import React from "react";
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
};

export const ItemType = {
  ITEM: "item",
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
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: id,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      id={id}
      ref={drag}
      className={`item ${(expandV && "expanded-v") || (expandH && "expanded-h")}`}
      style={{
        margin: "2px",
        gridColumn: `${x}/ span ${defaultW}`,
        gridRow: `${y}/ span ${defaultH}`,
        overflow: "hidden",
        whiteSpace: "nowrap",
        opacity: isDragging ? 0.5 : 1,
        // minWidth: !expandH ? minW + "px" : undefined,
        // width: !expandH ? defaultW : undefined,
        // maxWidth: !expandH ? maxW + "px" : undefined,
        // minHeight: !expandV ? minH + "px" : undefined,
        // height: !expandV ? defaultH : undefined,
        // maxHeight: !expandV ? maxH + "px" : undefined,
      }}>
      {children}
    </div>
  );
};
export default GridItem;
