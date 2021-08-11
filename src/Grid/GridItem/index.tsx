import React, { useMemo, useRef, CSSProperties, useState } from "react";
import { useDrag, useDrop, DragSourceMonitor } from "react-dnd";
import { useContext, EditorModeContextType } from "../../contextProvider";
import { DragItem } from "../interfaces";

import Icon from "../../Icon";

import "../grid.css";

export type Location = { zone?: string, section?: string, area?: string };

export type ItemProps<T extends Location> = {
  className?: string;
  id: string;
  index: number;
  extendable?: boolean;
  extended?: boolean;
  draggable?: boolean; // Optional to override or not use editorMode context. **Needs to be accompanied with GridAreas droppable prop**
  onReorder: (
    id?: string,
    originalLocation?: T,
    currentIndex?: number,
    hoverIndex?: number
  ) => void;
  onMoveArea: (
    currentItem?: string,
    dropLocation?: T,
    originalLocation?: T
  ) => void;
  onExtend?: (id: string) => void;
  // Props passed from parent.
  location?: T;
  end?: boolean;
  vertical?: boolean;
  // Extra customizable parts only for the really picky.
  styles?: CSSProperties;
  editorStyles?: CSSProperties;
  iconSize?: number;
  iconColor?: string;
};

export const ItemTypes = {
  IT3M: "it3m",
  GROUP: "group"
};

const GridItem: React.FC<ItemProps<Location>> = ({
  className,
  children,
  id,
  index,
  extendable,
  extended,
  draggable,
  onReorder,
  onMoveArea,
  onExtend,
  // Passed from parent (aka GridArea).
  location,
  end,
  vertical,
  // Picky stuff.
  styles,
  editorStyles,
  iconSize,
  iconColor = "rgb(255, 255, 255)"
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { editorMode }: EditorModeContextType = useContext();

  const [isHovered, setHovered] = useState(false);

  const handleExtend = () => {
    if (!extendable || !onExtend) return;
    onExtend(id);
    setHovered(false);
  };

  // ***************************************
  // Drag n drop logic
  const [{ handlerId }, drop] = useDrop({
    accept: [ItemTypes.IT3M, ItemTypes.GROUP],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current || !editorMode || draggable) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      const hoverClientX = clientOffset.x = hoverBoundingRect.left;

      if (vertical) {
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
      } else {
        if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
          return;
        }

        if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
          return;
        }
      }

      onReorder(item.id, location, dragIndex, hoverIndex);
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.IT3M,
    item: { id, index },
    canDrag: draggable ?? editorMode,
    end: (item, monitor) => {
      const dropResults: { location: Location } | null = monitor.getDropResult();

      if (dropResults) {
        onMoveArea(item.id, dropResults.location, location)
      }
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  preview(drop(ref));
  // ***************************************

  // ***************************************
  // External styles for editorMode or the vanilla grid
  const stylesFromProps: CSSProperties | undefined = editorMode ? editorStyles : styles;

  const itemStyles: CSSProperties = useMemo(
    () => ({
      opacity: isDragging ? 0.5 : 1,
      minHeight: isHovered && editorMode ? "40px" : undefined,
      width: !vertical && extended ? "100%" : undefined,
      minWidth: isHovered && editorMode ? extendable ? "70px" : "30px" : undefined,
      height: vertical && extended ? "100%" : undefined,
    }),
    [isDragging, isHovered, extended, vertical],
  );

  const containerStyle: CSSProperties = useMemo(() => ({
    position: "relative",
    display: "inline-block",
    minHeight: isHovered && editorMode ? "40px" : undefined,
    width: !vertical && extended ? "100%" : undefined,
    minWidth: isHovered && editorMode ? extendable ? "70px" : "30px" : undefined,
    height: vertical && extended ? "100%" : undefined,
  }),
    [isHovered, extended, vertical],
  );

  const overlayStyles: CSSProperties = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    background: "rgba(0,0,0,0.6)",
    borderRadius: "6px"
  };

  const buttonStyles: CSSProperties = useMemo(
    () => ({
      display: "flex",
      alignItems: end ? "end" : "start",
      justifyContent: "space-between",
      padding: "6px",
      float: end ? "right" : "left",
    }), [end]);
  // ***************************************

  const childrenWithParentProps = React.Children.map(
    children, child => React.cloneElement(child as React.ReactElement<{ extended: boolean }>, { extended: extended })
  );

  return (
    <div
      id={id}
      ref={ref}
      data-handler-id={handlerId}
      className={`${className} item`}
      style={{ ...itemStyles, ...stylesFromProps }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div style={containerStyle}>
        {(draggable ?? editorMode) && isHovered && (
          <div style={overlayStyles}>
            <div style={buttonStyles}>
              <div ref={drag}>
                <Icon name="moveArrows" size={iconSize} styles={{ color: iconColor }} />
              </div>
              {extendable &&
                <Icon name={vertical ? "verticalExtend" : "horizontalExtend"} size={iconSize} styles={{ color: iconColor, marginLeft: "8px" }} onClick={handleExtend} />
              }
            </div>
          </div>
        )}
        {childrenWithParentProps}
      </div>
    </div>
  );
};

export default GridItem;
