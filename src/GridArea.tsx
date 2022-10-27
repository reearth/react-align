import React, {
  CSSProperties,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
import { Droppable } from "react-beautiful-dnd";

import { useAlignContext } from "./context";
import Icon from "./Icon";
import "./grid.css";

export type Alignment = "start" | "centered" | "end";

export type AreaProps = {
  id: string;
  className?: string;
  vertical?: boolean;
  stretch?: boolean;
  end?: boolean;
  align?: Alignment;
  realignable?: boolean;
  disabled?: boolean;
  /** Extra customizable parts only for the really picky */
  style?: CSSProperties;
  editorStyle?: CSSProperties;
  iconColor?: string;
  onAlignChange?: (alignment: Alignment) => void;
  onClick?: (id?: string) => void;
};

const alignments = ["start", "centered", "end"] as const;

export default function GridArea({
  id,
  className,
  vertical,
  stretch,
  end,
  disabled,
  align,
  realignable,
  children,
  // Picky stuff
  style,
  editorStyle,
  iconColor = "#FFFFFF",
  onAlignChange,
  onClick,
}: PropsWithChildren<AreaProps>) {
  // ***** Keeps everything working inside dev environment with React 18 StrictMode *****
  const [enableDrop, setEnableDrop] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnableDrop(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnableDrop(false);
    };
  }, []);
  // ***** Keeps everything working inside dev environment with React 18 StrictMode *****

  const { editing: enabled, onAlignChange: onAlignChange2 } = useAlignContext();

  const handleAlignChange = useCallback(() => {
    if (!realignable) return;
    const a =
      alignments[
        (align ? alignments.indexOf(align) + 1 : 0) % alignments.length
      ];
    onAlignChange?.(a);
    onAlignChange2?.(id, a);
  }, [align, realignable, onAlignChange, onAlignChange2, id]);

  const handleClick = useCallback(() => {
    if (!enabled) return;
    onClick?.(id);
  }, [id, enabled, onClick]);

  const buttonStyle: CSSProperties = useMemo(
    () => ({
      position: "absolute",
      left: vertical ? (end ? 0 : undefined) : "50%",
      right: vertical ? (!end ? 0 : undefined) : "50%",
      bottom: !vertical && !end ? 0 : vertical ? "50%" : undefined,
      top: vertical ? "50%" : end ? 0 : undefined,
      opacity: !disabled && enabled && realignable ? 1 : 0,
      pointerEvents: !disabled && enabled && realignable ? "auto" : "none",
      transition: "all 0.5s ease-in-out",
    }),
    [vertical, end, disabled, enabled, realignable]
  );

  // Rebuilds the GridItem children to receive their parent GridArea's 'end' and 'vertical' values.
  // Used to know where to align the overlay buttons (end) and how to extend the GridItems (vertical).
  const childrenWithParentProps = useMemo(
    () =>
      React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement<any>, {
          end,
          vertical,
        })
      ),
    [children, end, vertical]
  );

  return enableDrop ? (
    <Droppable
      droppableId={id}
      direction={vertical ? "vertical" : "horizontal"}
      isDropDisabled={disabled}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={[
            className,
            "area",
            stretch && "stretch",
            end && "end",
            align === "centered"
              ? "just-centered"
              : align === "end"
              ? "just-end"
              : "start",
            enabled ? "area-transition-in" : "area-transition-out",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{
            flexDirection: vertical ? "column" : "row",
            minHeight:
              !React.Children.count(children) && !enabled ? "0px" : "26px",
            minWidth:
              !React.Children.count(children) && !enabled ? "0px" : "46px",
            opacity: snapshot.isDraggingOver ? 0.8 : 1,
            ...(enabled ? editorStyle : style),
          }}
          onClick={handleClick}
        >
          {childrenWithParentProps}
          {provided.placeholder}
          <div style={buttonStyle}>
            <div
              onClick={handleAlignChange}
              style={{
                cursor: "pointer",
                color: iconColor,
              }}
            >
              <Icon
                name={
                  align === "centered"
                    ? vertical
                      ? "alignCenterV"
                      : "alignCenter"
                    : align === "end"
                    ? vertical
                      ? "alignEndV"
                      : "alignEnd"
                    : vertical
                    ? "alignStartV"
                    : "alignStart"
                }
              />
            </div>
          </div>
        </div>
      )}
    </Droppable>
  ) : null;
}
