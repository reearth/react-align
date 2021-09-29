import React, {
  CSSProperties,
  PropsWithChildren,
  useCallback,
  useMemo,
} from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { useAlignContext } from './context';
import Icon from './Icon';
import './grid.css';

export type Alignment = 'start' | 'end' | 'centered';

export type AreaProps = {
  id: string;
  className?: string;
  vertical?: boolean;
  stretch?: boolean;
  end?: boolean;
  align?: Alignment;
  disabled?: boolean;
  /** Extra customizable parts only for the really picky */
  style?: CSSProperties;
  editorStyle?: CSSProperties;
  iconColor?: string;
  onAlignmentChange?: (alignment: Alignment) => void;
};

const alignments = ['start', 'centered', 'end'] as const;

export default function GridArea({
  id,
  className,
  vertical,
  stretch,
  end,
  disabled,
  align,
  onAlignmentChange,
  children,
  // Picky stuff
  style,
  editorStyle,
  iconColor = '#FFFFFF',
}: PropsWithChildren<AreaProps>) {
  const { editing: enabled, onAlignChange: onAlignChange2 } = useAlignContext();

  const handleAlignChange = useCallback(() => {
    const a =
      alignments[
        (align ? alignments.indexOf(align) + 1 : 0) % alignments.length
      ];
    onAlignmentChange?.(a);
    onAlignChange2?.(id, a);
  }, [align, onAlignmentChange, onAlignChange2, id]);

  const buttonStyle: CSSProperties = useMemo(
    () => ({
      position: 'absolute',
      left: vertical ? (end ? 0 : undefined) : '50%',
      right: vertical ? (!end ? 0 : undefined) : '50%',
      bottom: !vertical && !end ? 0 : vertical ? '50%' : undefined,
      top: vertical ? '50%' : end ? 0 : undefined,
      opacity: !disabled && enabled && align ? 1 : 0,
      pointerEvents: !disabled && enabled && align ? 'auto' : 'none',
      transition: 'all 0.5s ease-in-out',
    }),
    [vertical, end, disabled, enabled, align]
  );

  // Rebuilds the GridItem children to receive their parent GridArea's 'end' and 'vertical' values.
  // Used to know where to align the overlay buttons (end) and how to extend the GridItems (vertical).
  const childrenWithParentProps = useMemo(
    () =>
      React.Children.map(children, child =>
        React.cloneElement(child as React.ReactElement<any>, {
          end,
          vertical,
        })
      ),
    [children, end, vertical]
  );

  return (
    <Droppable
      droppableId={id}
      direction={vertical ? 'vertical' : 'horizontal'}
      isDropDisabled={disabled}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={[
            className,
            'area',
            stretch && 'stretch',
            end && 'end',
            align === 'centered'
              ? 'just-centered'
              : align === 'end'
              ? 'just-end'
              : 'start',
            enabled ? 'area-transition-in' : 'area-transition-out',
          ]
            .filter(Boolean)
            .join(' ')}
          style={{
            flexDirection: vertical ? 'column' : 'row',
            minHeight:
              !React.Children.count(children) && !enabled ? '0px' : '26px',
            minWidth:
              !React.Children.count(children) && !enabled ? '0px' : '46px',
            opacity: snapshot.isDraggingOver ? 0.8 : 1,
            ...(enabled ? editorStyle : style),
          }}
        >
          {childrenWithParentProps}
          {provided.placeholder}
          <div style={buttonStyle}>
            <div
              onClick={handleAlignChange}
              style={{
                cursor: 'pointer',
              }}
            >
              <Icon
                name={
                  align === 'centered'
                    ? vertical
                      ? 'alignCenterV'
                      : 'alignCenter'
                    : align === 'end'
                    ? vertical
                      ? 'alignEndV'
                      : 'alignEnd'
                    : vertical
                    ? 'alignStartV'
                    : 'alignStart'
                }
                style={{
                  color: iconColor,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </Droppable>
  );
}
