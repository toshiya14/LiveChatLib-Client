import { createContext } from "react";

export type ConfigModel = {
  scale: number;
  frontcolor: string;
  popupDirection: "up" | "down";
  debug: boolean;
  iconSize: number;
  fadeInTiming: number;
  highlightTiming: number;
  stayTiming: number;
  fadeOutTiming: number;
};

export type DispatchableConfigModel = [ConfigModel, React.Dispatch<React.SetStateAction<ConfigModel>>];

export const ConfigContext = createContext<DispatchableConfigModel>({} as DispatchableConfigModel);
