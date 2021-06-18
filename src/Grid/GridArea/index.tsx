import React from "react";
import { useDrop, DropTargetMonitor } from "react-dnd";
import { Location, ItemProps } from "../GridItem";
import "../grid.scss";

// import { DragItem } from "../interfaces";
import { ItemTypes } from "../GridItem";

export type AreaProps<T extends Location> = {
  vertical?: boolean;
  reverse?: boolean;
  end?: boolean;
  align?: string;
  location: T;
};

const GridArea: React.FC<AreaProps<Location>> = ({
  vertical,
  children,
  reverse,
  end,
  location,
}) => {

  const [{ isOver, draggingItem }, drop] = useDrop(() => ({
    accept: [ItemTypes.IT3M, ItemTypes.GROUP],
    drop: () => ({ location: location }),
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
      draggingItem: monitor.getItemType() as string,
    }),
  })
  );

  const childrenWithParentProps = React.Children.map(children, child => React.cloneElement(child as React.ReactElement<ItemProps<Location>>, { end, vertical }))

  return (
    <div
      ref={drop}
      className={`area ${end && "end"}
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
      {childrenWithParentProps}
    </div>
  );
};

export default GridArea;
