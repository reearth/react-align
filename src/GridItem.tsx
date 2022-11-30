import { useMemo, CSSProperties, useState, useCallback, ReactNode } from "react";
import { Draggable } from "react-beautiful-dnd";

import { useAlignContext } from "./context";
import Icon from "./Icon";
import "./grid.css";

export type ItemProps = {
  className?: string;
  id: string;
  index: number;
  extendable?: boolean;
  extended?: boolean;
  disabled?: boolean;
  onExtend?: (extended: boolean) => void;
  children?:
    | ReactNode
    | ((context: {
        id: string;
        editing: boolean;
        isDragging: boolean;
        isHovered: boolean;
        extended: boolean;
        extendable: boolean;
        disabled: boolean;
        index: number;
      }) => ReactNode);
  /** Extra customizable parts only for the really picky */
  style?: CSSProperties;
  editorStyle?: CSSProperties;
  iconColor?: string;
};

export default function GridItem({
  className,
  children,
  id,
  index,
  extendable = false,
  extended = false,
  disabled = false,
  // Picky stuff.
  style,
  editorStyle,
  iconColor = "rgb(255, 255, 255)",
  ...props
}: ItemProps) {
  const { vertical } = props as {
    startBottom?: boolean;
    vertical?: boolean;
  };
  const { editing, isDragging, onExtend } = useAlignContext();
  const [isHovered, setHovered] = useState(false);
  const handleExtend = useCallback(() => {
    if (!extendable) return;
    setHovered(false);
    onExtend?.(id, !extended);
  }, [extendable, onExtend, extended, id]);

  const buttonStyles: CSSProperties = useMemo(
    () => ({
      alignItems: "start",
      float: "left",
      color: iconColor,
    }),
    [iconColor],
  );

  const ctx = useMemo(
    () => ({
      id,
      editing,
      isDragging,
      isHovered,
      extended,
      extendable,
      disabled,
      index,
    }),
    [disabled, editing, extendable, extended, id, index, isDragging, isHovered],
  );

  return (
    <Draggable draggableId={id} index={index} isDragDisabled={disabled}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`${className} item`}
          style={{
            flex: extended && !snapshot.isDragging ? "auto" : undefined,
            opacity: snapshot.isDragging ? 0.5 : 1,
            ...(editing ? editorStyle : style),
            ...provided.draggableProps.style,
          }}>
          <div
            style={{
              position: "relative",
              minHeight: isHovered && !disabled ? "35px" : undefined,
              width: !vertical && extended ? "100%" : undefined,
              minWidth: isHovered && !disabled ? (extendable ? "70px" : "35px") : undefined,
              height: vertical && extended ? "100%" : undefined,
            }}
            onMouseEnter={() => editing && setHovered(true)}
            onMouseLeave={() => editing && setHovered(false)}
            onClick={e => e.stopPropagation()}>
            {typeof children === "function" ? children(ctx) : children}
            <div
              className="overlay"
              style={{
                display:
                  !disabled && editing && isHovered && (snapshot.isDragging || !isDragging)
                    ? "block"
                    : "none",
              }}>
              <div className="overlay-buttons" style={buttonStyles}>
                <div {...provided.dragHandleProps} style={{ cursor: "grab" }}>
                  <Icon name="moveArrows" />
                </div>
                {extendable && (
                  <div style={{ cursor: "pointer", marginLeft: "8px" }} onClick={handleExtend}>
                    <Icon name={vertical ? "verticalExtend" : "horizontalExtend"} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
