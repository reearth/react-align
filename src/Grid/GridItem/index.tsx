import React from "react";
import "../grid.css";

export type ItemProps = {
    expandV?: boolean;
    expandH?: boolean;
    defaultH?: number;
    minH?: number;
    maxH?: number;
    defaultW?: number;
    minW?: number;
    maxW?: number;
}

const GridItem: React.FC<ItemProps> = ({ children, expandV, expandH, defaultH, minH, maxH, defaultW, minW, maxW }) => {
    const height = !expandV ? {
        minHeight: minH,
        maxHeight: maxH,
    } : undefined;

    const width = !expandH ? {
        minWidth: minW,
        maxWidth: maxW,
    } : undefined;

    const styles = height && width ? Object.assign(height, width) : height || width;

    return (
        <div className={`item ${expandV && "expanded-v" || expandH && "expanded-h"}`} style={styles}>
            {children}
        </div>
    )
}
export default GridItem;
