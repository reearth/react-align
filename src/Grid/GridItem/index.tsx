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
  // x?: number;
  // y?: number;
  draggable: boolean;
  locationName: {section?: string, area?: string};
  onMove: ( 
    currentItem: string, dropLocation: { section?: string, area?: string }, originalLocation: { section?: string, area?: string }
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

  const [{ isDragging, blah }, drag] = useDrag(() => ({
    type: ItemTypes.PLUGIN,
    item: {id},
    canDrag: draggable,
    end: (item, monitor) =>{
      const dropResults: {dropEffect: string, area: {section?: string, area?: string}} | null = monitor.getDropResult();
      console.log(dropResults, "RESULTS");
      // console.log(item, "RESULTS item");
      console.log(blah, "blah getTargetIds");
      if (!dropResults) return;
      onMove(item.id, dropResults?.area, locationName)
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
      blah: monitor.getTargetIds()
    }),
  }));

  const containerStyle: CSSProperties = useMemo(
    () => ({
      margin: "2px",
      // gridColumn: `${x}/ span ${defaultW}`,
      // gridRow: `${y}/ span ${defaultH}`,
      // overflow: "hidden",
      // whiteSpace: "nowrap",
      width: defaultW + "px",
      height: defaultH + "px",
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
