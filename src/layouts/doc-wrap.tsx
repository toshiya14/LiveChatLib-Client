import { Header } from "./header";
import "./doc-wrap.scss";
import { useCallback, useContext, useMemo, useState } from "react";
import { ConfigContext, ConfigModel } from "../context/config-context";
import { Box, Flex, HStack } from "@chakra-ui/react";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DebugMenu } from "../components/debug-menu";
import { Danmaku, DanmakuContext, DanmakuModel } from "../context/danmaku-context";
import { CommentsPopup } from "../components/comments-popup";
import { UtilsContext, UtilsModel } from "../context/utils-context";
import { MainPage } from "./main-page";
import { Dispatchable } from "../objects/dispatchable-object";

export function DocWrap() {
  const configState = useState<ConfigModel>({
    scale: 1,
    frontcolor: "#f8f8f8",
    popupDirection: "down",
    debug: true,
    iconSize: 48,
    fadeInTiming: 250,
    fadeOutTiming: 250,
    stayTiming: 10000,
    highlightTiming: 3000
  });

  const [$cfg, set$cfg] = configState;

  const utilsState = useState<UtilsModel>({
    unit: (x: number) => useMemo(() => $cfg.scale * x + "px", [$cfg.scale])
  });

  const [$utils] = utilsState;

  return (
    <ConfigContext.Provider value={configState}>
      <DanmakuContext.Provider
        value={{
          list: useState([] as Danmaku[]),
          page: useState(-1)
        }}>
        <UtilsContext.Provider value={utilsState}>
          <MainPage />
        </UtilsContext.Provider>
      </DanmakuContext.Provider>
    </ConfigContext.Provider>
  );
}
