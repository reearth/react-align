import React, { useState } from "react";

export type ContextType = {
    editorMode?: boolean;
    setEditorMode?: (on: boolean) => void;
};

const Context = React.createContext<ContextType>({});

export type ContextProviderProps = {
    children?: React.ReactNode;
};

// Wrap section of your app you want the context.
const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
    const [editorMode, setEditorMode] = useState(false);
    const value = { editorMode, setEditorMode };

    return <Context.Provider value={value}>{children}</Context.Provider>
};

// useContext has extra safety in checking if context has a value. 
// You can destructure into a component and use the context as you like.
const useContext = () => {
    const context = React.useContext(Context);
    if (context === undefined) {
        throw new Error("useContext must be used within the ContextProvider")
    };
    return context
};

// An alternative to useContext. If you want to integrate the context into a component
// go this approach and wrap your component like: const coolButton = ContextConsumer(Button)
const ContextConsumer = <P extends object>(
    Component: React.FC<P>,
): React.FC<Omit<P, keyof ContextType>> => props => (
    <Context.Consumer>
        {({ editorMode, setEditorMode }) => <Component {...props as P} editorMode={editorMode} setEditorMode={setEditorMode} />}
    </Context.Consumer>
);

export { useContext, ContextProvider, ContextConsumer };
