import { Box, Center, GridItem, HStack, Image, VStack, Text } from "@chakra-ui/react";
import classNames from "classnames";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { ConfigContext } from "../context/config-context";
import { DanmakuComment } from "../context/danmaku-context";
import { UtilsContext } from "../context/utils-context";
import "./popup.scss";
import moment from "moment";
import "moment/locale/zh-cn";

export type CommentsProps = {
  item: DanmakuComment;
  holding?: boolean;
  state: "in" | "highlight" | "stay" | "out" | "gone";
};

type ViewState = "in" | "highlight" | "stay" | "out" | "gone";

export function CommentsPopup(props: CommentsProps) {
  const [$cfg, set$cfg] = useContext(ConfigContext);
  const [$utils] = useContext(UtilsContext);
  const rootref = useRef<HTMLDivElement>(null);
  const [viewState, setViewState] = useState<ViewState>("in");

  useEffect(() => {
    if (!props.holding) {
      setTimeout(() => {
        setViewState("highlight");
      }, $cfg.fadeInTiming);
      setTimeout(() => {
        setViewState("stay");
      }, $cfg.fadeInTiming + $cfg.highlightTiming);
      setTimeout(() => {
        setViewState("out");
      }, $cfg.stayTiming);
    }
  }, []);

  const popupItemClass = useMemo(() => {
    const classDef: any = {
      "popup-item": true
    };

    if (!props.holding) {
      if (viewState === "in") {
        classDef.new = true;
        classDef.collapsed = true;
      } else if (viewState === "highlight") {
        classDef.new = true;
        classDef.collapsed = false;
      } else if (viewState === "stay") {
        classDef.new = false;
        classDef.collapsed = false;
      } else if (viewState === "out") {
        classDef.new = false;
        classDef.collapsed = true;
      }
    }

    const popupItemClass = classNames(classDef);
    return popupItemClass;
  }, [viewState]);

  const [time, setTime] = useState("几秒前");
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(props.item.time.fromNow());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <HStack
      ref={rootref}
      className={popupItemClass}
      mt={$cfg.popupDirection === "down" ? $utils.unit(2) : undefined}
      mb={$cfg.popupDirection === "up" ? $utils.unit(2) : undefined}
      borderRadius={$utils.unit(5)}
      style={{
        transitionDuration: $cfg.fadeInTiming + "ms",
        animationDuration: $cfg.highlightTiming / 6 + "ms",
        animationDelay: $cfg.fadeInTiming + "ms"
      }}>
      <Center className="icon-wrap" p={$utils.unit(7.5)}>
        <Box
          className="icon-border"
          width={$utils.unit($cfg.iconSize)}
          height={$utils.unit($cfg.iconSize)}
          bgImage={props.item.avatar}></Box>
      </Center>
      <VStack className="content-wrap" flexGrow="1">
        <Box className="time" fontSize={$utils.unit(13)} right={$utils.unit(5)} top={$utils.unit(5)}>
          {time}
        </Box>
        <Box className="sender" fontSize={$utils.unit(14)} mt={$utils.unit(5)}>
          {props.item.sender}
        </Box>
        <Box className="comments" fontSize={$utils.unit(13)} style={{ marginBottom: $utils.unit(5) }}>
          {props.item.comments}
        </Box>
      </VStack>
    </HStack>
  );
}
