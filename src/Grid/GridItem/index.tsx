import React from "react";
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
  //   setDragItem?: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const GridItem: React.FC<ItemProps> = ({
  children,
  id,
  expandV,
  expandH,
  minH,
  maxH,
  minW,
  maxW,
  x,
  y,
  defaultW,
  defaultH,
  //   y,
  //   setDragItem,
}) => {
  let timer: NodeJS.Timeout;

  const onDrag = (ev: React.DragEvent<HTMLDivElement>) => {
    // if (!setDragItem) return;

    const target = ev.target as HTMLDivElement;
    // var style = window.getComputedStyle(target, null);

    // console.log(target, "EV");
    // console.log(style.getPropertyValue("top"), "style");

    // ev.dataTransfer.setData("text/plain",
    //     (parseInt(style.getPropertyValue("left"), 10) - ev.clientX) + ',' + (parseInt(style.getPropertyValue("top"), 10) - ev.clientY));

    // ev.dataTransfer.effectAllowed = "move";
    ev.dataTransfer.setData("text", target.id);
    target.style.backgroundColor = "purple";
    // timer = setTimeout(() => {
    //     target.classList.add("hide");
    // }, 500)
    return false;
  };

  //   const onMouseDown = (ev: React.DragEvent<HTMLDivElement>) => {
  //     if (!setDragItem) return;
  //     // ev.preventDefault();
  //     setDragItem(id);
  //   };

  // const onMouseUp = (ev: React.DragEvent<HTMLDivElement>) => {
  //     alert("HELLO")
  //     clearTimeout();
  // }

  return (
    <div
      id={id}
      className={`item ${(expandV && "expanded-v") || (expandH && "expanded-h")}`}
      style={{
        margin: "2px",
        gridColumn: `${x}/ span ${defaultW}`,
        gridRow: `${y}/ span ${defaultH}`,
        overflow: "hidden",
        whiteSpace: "nowrap",
        // minWidth: !expandH ? minW + "px" : undefined,
        // width: !expandH ? defaultW : undefined,
        // maxWidth: !expandH ? maxW + "px" : undefined,
        // minHeight: !expandV ? minH + "px" : undefined,
        // height: !expandV ? defaultH : undefined,
        // maxHeight: !expandV ? maxH + "px" : undefined,
      }}
      draggable
      onDragStart={onDrag}
      //   onMouseDown={onMouseDown}
      // onMouseUp={onMouseUp}
    >
      {children}
    </div>
  );
};
export default GridItem;
