import React, {
  useMemo,
  CSSProperties,
  useState,
  PropsWithChildren,
  useCallback,
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
};

export default function GridItem({
  className,
  children,
  id,
  index,
  extendable,
  extended,
  disabled,
  onExtend,
  // Picky stuff.
  style,
  editorStyle,
  iconSize,
  iconColor = 'rgb(255, 255, 255)',
  ...props
}: PropsWithChildren<ItemProps>) {
  const { end, vertical } = props as {
    end?: boolean;
    vertical?: boolean;
  };
  const {
    editing: enabled,
    isDragging,
    onExtend: onExtend2,
  } = useAlignContext();
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
            ...(enabled ? editorStyle : style),
            ...provided.draggableProps.style,
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div
            className="overlay"
            style={{
              display:
                !disabled &&
                enabled &&
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
          {children}
        </div>
      )}
    </Draggable>
  );
}
