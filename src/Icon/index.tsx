import React, { CSSProperties } from "react";
import { css } from "glamor";
import { ReactSVG } from "react-svg";

import Icons from "./icons";

export type Icons = keyof typeof Icons;

export type IconProps = {
    name: string | Icons;
    size?: number;
    onClick?: () => void;
    style?: CSSProperties;
}

const IconStyles = (size?: number) => css({
    cursor: "pointer",
    ":hover": {
        // background: "red",
        // boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px"
    },
    ' svg': {
        height: size || 24,
        width: size || 24,
    }
})

const Icon: React.FC<IconProps> = ({ name, size, onClick, style }) => {
    if (typeof name === "string") {
        const LocalIconComponent = Icons[name as Icons];
        if (LocalIconComponent) {
            return (
                <ReactSVG
                    src={LocalIconComponent}
                    style={style}
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