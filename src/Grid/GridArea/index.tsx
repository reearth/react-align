import React from "react";
import "../grid.css";

export type AreaProps = {
    vertical?: boolean;
    reverse?: boolean;
    end?: boolean;
}

const GridArea: React.FC<AreaProps> = ({
    vertical,
    children,
    reverse,
    end
}) => (
    <div
        className={
            `area ${(end &&
                "bottom")} 
            ${vertical ? reverse ?
                "vertical-r" :
                "vertical" :
                reverse ?
                    "horizontal-r" : "horizontal"}
            `}
    >
        {children}
    </div>
)

export default GridArea;
