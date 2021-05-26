import React from "react";
import "../grid.scss";
import useHooks from "./hooks";

export type AreaProps = {
  id: string;
  vertical?: boolean;
  reverse?: boolean;
  end?: boolean;
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
  cols,
  colSize = 24,
  rowSize = 24,
}) => {
  const { CalculateColumns } = useHooks();

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
      }}>
      {children}
    </div>
  );
};

export default GridArea;
