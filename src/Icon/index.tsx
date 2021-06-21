import React, { CSSProperties } from "react";
import { css } from "glamor";
import { ReactSVG } from "react-svg";

import Icons from "./icons";

export type Icons = keyof typeof Icons;

export type IconProps = {
    name: string | Icons;
    size?: number;
    onClick?: () => void;
    styles?: CSSProperties;
}

const IconStyles = (size?: number) => css({
    cursor: "pointer",
    width: size || 24 + "px",
    height: size || 24 + "px",
    ' svg': {
        height: size || 24 + "px",
        width: size || 24 + "px",
    }
})

const Icon: React.FC<IconProps> = ({ name, size, onClick, styles }) => {
    if (typeof name === "string") {
        const LocalIconComponent = Icons[name as Icons];
        if (LocalIconComponent) {
            return (
                <ReactSVG
                    src={LocalIconComponent}
                    style={styles}
                    {...IconStyles(size)}
                    onClick={onClick}
                />
            );
        }
    }

    return (
        <ReactSVG src={name} />
    )
};

export default Icon;