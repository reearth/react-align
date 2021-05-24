import React, { useCallback, useEffect, useState } from "react";
import "../grid.scss";
import useHooks from "./hooks";

export type AreaProps = {
  id: string;
  vertical?: boolean;
  reverse?: boolean;
  end?: boolean;
  dragItem?: string;
  cols?: number;
  colSize?: number;
  rowSize?: number;
};

const GridArea: React.FC<AreaProps> = ({
  id,
  vertical,
  children,
  reverse,
  end,
  dragItem,
  cols,
  colSize = 24,
  rowSize = 24,
}) => {
  const { CalculateColumns } = useHooks();
  const allowDrop = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    return false;
  };

  const onDrop = (ev: React.DragEvent<HTMLDivElement>) => {
    if (!dragItem) return;

    ev.preventDefault();

    const dID = ev.dataTransfer.getData("text");
    const draggable = document.getElementById(dID);
    if (!draggable) return;
    draggable.classList.remove("hide");
    ev.currentTarget.appendChild(draggable);
    return false;
  };
  //   ---------------------------------
  // NEED TO GET MIDDLE WORKING!!!! TBD
  // NEED TO GET MIDDLE WORKING!!!! TBD
  // NEED TO GET MIDDLE WORKING!!!! TBD
  // NEED TO GET MIDDLE WORKING!!!! TBD
  //   const [columns, setColumns] = useState(cols);
  const columns = CalculateColumns(cols, colSize, id);
  //   console.log(columns, "columnsssss");
  return (
    <div
      id={id}
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
      }}
      onDrop={onDrop}
      onDragOver={allowDrop}>
      {children}
    </div>
  );
};

export default GridArea;
