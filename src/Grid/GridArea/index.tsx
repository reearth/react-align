import React from "react";
import { useDrop, DropTargetMonitor } from "react-dnd";
import "../grid.scss";

// import { DragItem } from "../interfaces";
import { ItemTypes } from "../GridItem";
// import useHooks from "./hooks";

export type AreaProps = {
  vertical?: boolean;
  reverse?: boolean;
  end?: boolean;
  align?: string;
  location: { section?: string, area?: string };
};

const GridArea: React.FC<AreaProps> = ({
  vertical,
  children,
  reverse,
  end,
  // align,
  location,
}) => {

  const [{ isOver, draggingItem }, drop] = useDrop(() => ({
    accept: [ItemTypes.PLUGIN, ItemTypes.GROUP],
    drop: () => ({ location }),
    // collect might be unnecessary
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
      // canDrop: monitor.canDrop(),
      draggingItem: monitor.getItemType() as string,
    }),
  })
  );

  return (
    <div
      ref={drop}
      className={`area ${end && "bottom"}
            ${vertical
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
        opacity: isOver ? 1 : 0.9
      }}>
      {children}
    </div>
  );
};

export default GridArea;
