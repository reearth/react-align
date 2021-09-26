import React, { CSSProperties, useCallback, useMemo } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { ItemProps } from '../GridItem';
import { useEditorMode } from '../../context';
import Icon from '../../Icon';
import '../grid.css';

import { ItemType } from '../GridItem';

export type Alignment = 'start' | 'end' | 'centered';

export type AreaProps<T = unknown> = {
  className?: string;
  vertical?: boolean;
  reverse?: boolean;
  stretch?: boolean;
  end?: boolean;
  droppable?: boolean; // optional to override editorMode context (enabled param passed to GridWrapper) **Needs to be accompanied with GridItems draggable prop**
  align?: Alignment;
  location: T;
  // Extra customizable parts only for the really picky
  styles?: CSSProperties;
  editorStyles?: CSSProperties;
  iconColor?: string;
  onAlignChange?: (a: Alignment) => void;
};

const GridArea: React.FC<AreaProps<Location>> = ({
  className,
  vertical,
  reverse,
  stretch,
  end,
  droppable,
  align,
  onAlignChange,
  location,
  children,
  // Picky stuff
  styles,
  editorStyles,
  iconColor = '#FFFFFF',
}) => {
  const { enabled } = useEditorMode();

  const handleAlignChange = useCallback(
    (align: Alignment) => {
      switch (align) {
        case 'start':
          onAlignChange?.('centered');
          break;
        case 'centered':
          onAlignChange?.('end');
          break;
        default:
          onAlignChange?.('start');
          break;
      }
    },
    [onAlignChange]
  );

  // ***************************************
  // Drop logic
  const [{ isOver }, drop] = useDrop(() => ({
    accept: [ItemType.ITEM, ItemType.GROUP],
    drop: () => ({ location: location }),
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
    }),
  }));
  // ***************************************

  // ***************************************
  // Internal styles used
  const buttonStyle: CSSProperties = useMemo(
    () => ({
      position: 'absolute',
      left: vertical ? (end ? 0 : undefined) : '50%',
      right: vertical ? (!end ? 0 : undefined) : '50%',
      bottom: !vertical && !end ? 0 : vertical ? '50%' : undefined,
      top: vertical ? '50%' : end ? 0 : undefined,
      opacity: (droppable ?? enabled) && align ? 1 : 0,
      transition: 'all 0.5s ease-in-out',
    }),
    [vertical, end, droppable, enabled, align]
  );

  const mainStyles: CSSProperties = useMemo(
    () => ({
      opacity: isOver ? 0.8 : 1,
      minHeight: !React.Children.count(children) && !enabled ? '0px' : '26px',
      minWidth: !React.Children.count(children) && !enabled ? '0px' : '46px',
    }),
    [isOver, children, enabled]
  );

  const stylesFromProps: CSSProperties | undefined = enabled
    ? editorStyles
    : styles;
  // ***************************************

  // Rebuilds the GridItem children to receive their parent GridArea's 'end' and 'vertical' values.
  // Used to know where to align the overlay buttons (end) and how to extend the GridItems (vertical).
  const childrenWithParentProps = React.Children.map(children, child =>
    React.cloneElement(child as React.ReactElement<ItemProps<Location>>, {
      end,
      vertical,
      location,
    })
  );

  return (
    <div
      ref={drop}
      className={`
      ${className}
      area
      ${stretch && 'stretch'}
      ${end && 'end'}
      ${
        align === 'centered'
          ? 'just-centered'
          : align === 'end'
          ? 'just-end'
          : 'start'
      }
      ${
        vertical
          ? reverse
            ? 'vertical-r'
            : 'vertical'
          : reverse
          ? 'horizontal-r'
          : 'horizontal'
      }
      ${enabled ? 'area-transition-in' : 'area-transition-out'}
      `}
      style={{ ...mainStyles, ...stylesFromProps }}
    >
      {childrenWithParentProps}
      <div style={buttonStyle}>
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
          styles={{
            color: iconColor,
            cursor:
              (droppable ?? enabled) &&
              align &&
              !!React.Children.count(children)
                ? 'pointer'
                : 'default',
          }}
          onClick={
            (droppable ?? enabled) && align && !!React.Children.count(children)
              ? () => handleAlignChange(align)
              : undefined
          }
        />
      </div>
    </div>
  );
};

export default GridArea;
