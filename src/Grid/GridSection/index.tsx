import React from "react";
import "../grid.css";

export type Props = {
    middle?: boolean;
}

const GridSection: React.FC<Props> = ({
    middle,
    children,
}) => (
    <div className={`section ${middle && "middle"}`}>
        {children}
    </div>
)

export default GridSection;
