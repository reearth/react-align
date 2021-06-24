import React, { useState } from "react";

type EditorModeContextType = {
    editorMode?: boolean;
    setEditorMode?: (on: boolean) => void;
};

const EditorModeContext = React.createContext<EditorModeContextType>({});

type EditorModeContextProviderProps = {
    children?: React.ReactNode;
};

// Wrap section of your app you want to access editorMode.
const EditorModeContextProvider: React.FC<EditorModeContextProviderProps> = ({ children }) => {
    const [editorMode, setEditorMode] = useState(false);
    const value = { editorMode, setEditorMode };

    return <EditorModeContext.Provider value={value}>{children}</EditorModeContext.Provider>
};

// useContext has extra safety in checking if context has a value. 
// You can destructure into a component and use the context as you like.
const useContext = () => {
    const context = React.useContext(EditorModeContext);
    if (context === undefined) {
        throw new Error("useContext must be used within the ContextProvider")
    };
    return context
};

// An alternative to useContext. If you want to integrate the context into a component
// go this approach and wrap your component like: const coolButton = ContextConsumer(Button)
const ContextConsumer = <P extends object>(
    Component: React.FC<P>,
): React.FC<Omit<P, keyof EditorModeContextType>> => props => (
    <EditorModeContext.Consumer>
        {({ editorMode, setEditorMode }) => <Component {...props as P} editorMode={editorMode} setEditorMode={setEditorMode} />}
    </EditorModeContext.Consumer>
);

export { useContext, EditorModeContextProvider, ContextConsumer, EditorModeContextType, EditorModeContextProviderProps };
