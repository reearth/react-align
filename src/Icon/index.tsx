import React, { CSSProperties } from "react";
import { css } from "glamor";
import { ReactSVG } from "react-svg";

import Icons from "./icons";

export type Icons = keyof typeof Icons;

export type IconProps = {
    className?: string;
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

const Icon: React.FC<IconProps> = ({ className, name, size, onClick, styles }) => {
    if (typeof name === "string") {
        const LocalIconComponent = Icons[name as Icons];
        if (LocalIconComponent) {
            return (
                <ReactSVG
                    className={className}
                    src={LocalIconComponent}
                    {...IconStyles(size)}
                    style={styles}
                    onClick={onClick}
                />
            );
        }
    }

    return (
        <ReactSVG className={className} src={name} />
    )
};

export default Icon;