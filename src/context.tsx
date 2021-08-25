import { createContext, useContext } from "react";

export const EditorModeContext = createContext<{ enabled: boolean | undefined }>({ enabled: undefined });
export const useEditorMode = () => useContext(EditorModeContext);