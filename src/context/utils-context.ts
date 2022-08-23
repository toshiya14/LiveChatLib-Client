import { createContext } from "react";

export type UtilsModel = {
  unit: (size: number) => string;
};

export type DispatchableUtilsModel = [UtilsModel, React.Dispatch<React.SetStateAction<UtilsModel>>];

export const UtilsContext = createContext({} as DispatchableUtilsModel);
