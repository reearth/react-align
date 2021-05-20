import React from "react";
import "../grid.scss";

export type WrapperProps = {
    vertical?: boolean;
    stretch?: boolean;
}

const GridWrapper: React.FC<WrapperProps> = ({ vertical, stretch, children }) => (
    <div className={`wrapper ${vertical && "vertical"} ${stretch && "stretch"}`}>
        {children}
    </div>
)

export default GridWrapper;