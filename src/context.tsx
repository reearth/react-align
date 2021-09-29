import { createContext, useContext } from 'react';
import { Alignment } from '.';

export const Context = createContext<{
  editing: boolean;
  isDragging: boolean;
  onAlignChange?: (location: string, align: Alignment) => void;
  onExtend?: (location: string, extended: boolean) => void;
}>({ editing: false, isDragging: false });
export const useAlignContext = () => useContext(Context);
