import React from "react";
import { Widget } from "../../../playground/src/hooks";
import "../grid.css";

export type Props = {
    widget?: Widget;
    expanded?: boolean;
}

const GridItem: React.FC<Props> = ({ children, widget, expanded }) =>
    <div
        className={`item ${expanded && "expanded"}`}
    // dimensions={widget}
    >
        <p>{widget?.name}</p>
        {children}
    </div>

export default GridItem;
