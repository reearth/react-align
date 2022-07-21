import { createContext, useContext } from "react";
import { Alignment } from ".";

export const Context = createContext<{
  editing: boolean;
  isDragging: boolean;
  onAlignChange?: (areaId: string, align: Alignment) => void;
  onExtend?: (id: string, extended: boolean) => void;
}>({ editing: false, isDragging: false });
export const useAlignContext = () => useContext(Context);
