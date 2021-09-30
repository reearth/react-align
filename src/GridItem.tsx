import React, {
  useMemo,
  CSSProperties,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { useAlignContext } from './context';
import Icon from './Icon';
import './grid.css';

export type ItemProps = {
  className?: string;
  id: string;
  index: number;
  extendable?: boolean;
  extended?: boolean;
  disabled?: boolean;
  /** Extra customizable parts only for the really picky */
  style?: CSSProperties;
  editorStyle?: CSSProperties;
  iconSize?: number;
  iconColor?: string;
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
};

export default function GridItem({
  className,
  children,
  id,
  index,
  extendable = false,
  extended = false,
  disabled = false,
  onExtend,
  // Picky stuff.
  style,
  editorStyle,
  iconSize,
  iconColor = 'rgb(255, 255, 255)',
  ...props
}: ItemProps) {
  const { end, vertical } = props as {
    end?: boolean;
    vertical?: boolean;
  };
  const { editing, isDragging, onExtend: onExtend2 } = useAlignContext();
  const [isHovered, setHovered] = useState(false);
  const handleExtend = useCallback(() => {
    if (!extendable) return;
    setHovered(false);
    onExtend?.(!extended);
    onExtend2?.(id, !extended);
  }, [extendable, onExtend, extended, onExtend2, id]);

  const buttonStyles: CSSProperties = useMemo(
    () => ({
      alignItems: end ? 'end' : 'start',
      float: end ? 'right' : 'left',
    }),
    [end]
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
    [disabled, editing, extendable, extended, id, index, isDragging, isHovered]
  );

  return (
    <Draggable draggableId={id} index={index} isDragDisabled={disabled}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`${className} item`}
          style={{
            flex: extended && !snapshot.isDragging ? 'auto' : undefined,
            opacity: snapshot.isDragging ? 0.5 : 1,
            ...(editing ? editorStyle : style),
            ...provided.draggableProps.style,
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div style={{ pointerEvents: editing ? 'none' : undefined }}>
            {typeof children === 'function' ? children(ctx) : children}
          </div>
          <div
            className="overlay"
            style={{
              display:
                !disabled &&
                editing &&
                isHovered &&
                (snapshot.isDragging || !isDragging)
                  ? 'block'
                  : 'none',
            }}
          >
            <div className="overlay-buttons" style={buttonStyles}>
              <div {...provided.dragHandleProps}>
                <Icon
                  name="moveArrows"
                  size={iconSize}
                  style={{ color: iconColor }}
                />
              </div>
              {extendable && (
                <div
                  style={{ cursor: 'pointer', marginLeft: '8px' }}
                  onClick={handleExtend}
                >
                  <Icon
                    name={vertical ? 'verticalExtend' : 'horizontalExtend'}
                    size={iconSize}
                    style={{ color: iconColor }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
