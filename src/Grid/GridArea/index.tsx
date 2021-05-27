import React, {useCallback, useState} from "react";
import {useDrop, DropTargetMonitor} from "react-dnd";
import "../grid.scss";

import {DragItem} from "../interfaces";
import {ItemTypes} from "../GridItem";
import useHooks from "./hooks";

export type AreaProps = {
  id: string;
  locationName?: {section?: string, area?: string};
  vertical?: boolean;
  reverse?: boolean;
  end?: boolean;
  cols?: number;
  colSize?: number;
  rowSize?: number;
};

const GridArea: React.FC<AreaProps> = ({
  id,
  locationName,
  vertical,
  children,
  reverse,
  end,
  cols,
  colSize = 24,
  rowSize = 24,
}) => {
  const { CalculateColumns } = useHooks();

  const [lastDroppedColor, setLastDroppedColor] = useState<string | null>(null)
  const handleDrop = useCallback(
    (item: any) => {
      setLastDroppedColor(item);
      console.log(locationName);
    },
    [],
  )

  const [{isOver, draggingItem}, drop] = useDrop(()=>({
    accept: [ItemTypes.PLUGIN, ItemTypes.GROUP],
    drop(_item: DragItem, monitor) {
      handleDrop(monitor.getItemType())
      alert(monitor.getItemType())
      return undefined
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
      // canDrop: monitor.canDrop(),
      draggingItem: monitor.getItemType() as string,
    }),
  }),
  [handleDrop]
  );

  //   ---------------------------------
  // NEED TO GET MIDDLE WORKING!!!! TBD
  // NEED TO GET MIDDLE WORKING!!!! TBD
  // NEED TO GET MIDDLE WORKING!!!! TBD
  // NEED TO GET MIDDLE WORKING!!!! TBD
  //   const [columns, setColumns] = useState(cols);
  const columns = CalculateColumns(cols, colSize, id);

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
        gridTemplateColumns: `repeat(${columns}, ${colSize + "px"})`,
        // gridAutoColumns: colSize + "px",
        gridAutoRows: rowSize + "px",
        background: draggingItem ? "red" : undefined,
        opacity: isOver ? 1 : 0.7
      }}>
      {children}
    </div>
  );
};

export default GridArea;
