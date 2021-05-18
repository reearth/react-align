import React from "react";

export type Props = {
    something?: string;
};

const Grid: React.FC<Props> = ({ something }) => {
    console.log(something);
    return (
        <div>
            <h1>Hello Grid!!!!</h1>
            <p>This is an edit</p>
            <p>{something}</p>
        </div>
    );
};

export default Grid;
