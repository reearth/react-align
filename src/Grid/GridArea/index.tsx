import React, {useCallback, useState} from "react";
import {useDrop, DropTargetMonitor} from "react-dnd";
import "../grid.scss";

import {DragItem} from "../interfaces";
import {ItemTypes} from "../GridItem";
// import useHooks from "./hooks";

export type AreaProps = {
  id: string;
  vertical?: boolean;
  reverse?: boolean;
  end?: boolean;
  align?: string;
  locationName: {section?: string, area?: string};
  // onMove: (currentItem: string, area:{section?: string, area?: string}) => void;
};

const GridArea: React.FC<AreaProps> = ({
  id,
  vertical,
  children,
  reverse,
  end,
  // align,
  locationName,
  // onMove
}) => {
  // const { CalculateColumns } = useHooks();

  const [lastDroppedColor, setLastDroppedColor] = useState<string | null>(null)
  const handleDrop = useCallback(
    (item: any) => {
      setLastDroppedColor(item);
      // console.log(locationName, "location name passed prop");
    },
    [],
  )

  const [{isOver, draggingItem}, drop] = useDrop(()=>({
    accept: [ItemTypes.PLUGIN, ItemTypes.GROUP],
    drop(item: DragItem, monitor) {
      handleDrop(monitor.getItemType())
      // console.log(monitor.getDropResult(), "getDropResult")
      console.log(item, "item")
      console.log(monitor.didDrop(), "didDrop")
      // console.log(id, "THIS IS THE DROPPED AREAS ID")

      // onMove(item.id, locationName);
      return {area: locationName}
    },
    // drop: () =>({name: "harhar"}),
    // collect might be unnecessary
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
      // canDrop: monitor.canDrop(),
      draggingItem: monitor.getItemType() as string,
    }),
  }),
  [handleDrop]
  );

  return (
    <div
      id={id}
      ref={drop}
      data-color={lastDroppedColor || 'none'}
      className={`area ${end && "bottom"}
            ${
              vertical
                ? reverse
                  ? "vertical-r"
                  : "vertical"
                : reverse
                ? "horizontal-r"
                : "horizontal"
            }
            `}
      style={{
        background: draggingItem ? "#3b3bd0" : undefined,
        opacity: isOver ? 1 : 0.7
      }}>
      {children}
    </div>
  );
};

export default GridArea;
