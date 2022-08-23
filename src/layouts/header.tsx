import { Box, Button, Center, HStack, Text } from "@chakra-ui/react";
import {
  faCaretDown,
  faCaretUp,
  faChalkboardUser,
  faComments,
  faEye,
  faFire,
  faGear,
  faGift,
  faServer,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { faBilibili } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cls from "classnames";
import { useContext, useEffect, useState } from "react";
import { ConfigContext, ConfigModel } from "../context/config-context";
import "./header.scss";
import { Line } from "./line";
import { ToggleButton } from "../components/toggle-button";
import { DanmakuContext } from "../context/danmaku-context";
import { UtilsContext } from "../context/utils-context";

export type HeaderProps = {
  remoteServerState: "ok" | "pending" | "lost";
  localServerState: "ok" | "pending" | "lost";
  //toggleIcon: "collapsed" | "expanded";
};

export function Header(props: HeaderProps) {
  const $dm = useContext(DanmakuContext);
  const [page, setPage] = $dm.page;
  const [$cfg] = useContext(ConfigContext);
  const [$utils] = useContext(UtilsContext);

  const remoteServerColor =
    props.remoteServerState === "ok"
      ? $cfg.frontcolor
      : props.remoteServerState === "pending"
      ? "#f1c40f"
      : "#ff7979";

  const localServerColor =
    props.localServerState === "ok"
      ? $cfg.frontcolor
      : props.localServerState === "pending"
      ? "#f1c40f"
      : "#ff7979";

  const HotnessIcon = <FontAwesomeIcon icon={faFire} color={$cfg.frontcolor} />;
  const VisitorIcon = <FontAwesomeIcon icon={faChalkboardUser} color={$cfg.frontcolor} />;
  const RemoteServerIcon = <FontAwesomeIcon icon={faBilibili} color={remoteServerColor} />;
  const LocalServerIcon = <FontAwesomeIcon icon={faServer} color={localServerColor} />;
  // const CollapsedIcon = <FontAwesomeIcon icon={faCaretUp} color={$cfg.frontcolor} />;
  // const ExpandedIcon = <FontAwesomeIcon icon={faCaretDown} color={$cfg.frontcolor} />;
  const MessageIcon = <FontAwesomeIcon icon={faComments} color={$cfg.frontcolor} />;
  const GiftIcon = <FontAwesomeIcon icon={faGift} color={$cfg.frontcolor} />;
  const ViewedIcon = <FontAwesomeIcon icon={faEye} color={$cfg.frontcolor} />;
  const SettingsIcon = <FontAwesomeIcon icon={faGear} color={$cfg.frontcolor} />;
  const RemoveIcon = <FontAwesomeIcon icon={faTimes} color={$cfg.frontcolor} />;

  return (
    <HStack
      className="app-header"
      px={$utils.unit(1.5)}
      py={$utils.unit(0.5)}
      borderRadius={$utils.unit(5)}
      userSelect="none"
      fontSize={$utils.unit(16)}>
      <Center className="hotness" color={$cfg.frontcolor}>
        {HotnessIcon}
        <Text className="value" p={$utils.unit(1)}>
          14
        </Text>
      </Center>
      <Center className="visitors" color={$cfg.frontcolor}>
        {VisitorIcon}
        <Text className="value" p={$utils.unit(1)}>
          14
        </Text>
      </Center>
      <Line w={$utils.unit(2)} px={$utils.unit(5)} color={$cfg.frontcolor} />
      <Center className="remote-server-state" color={$cfg.frontcolor}>
        {RemoteServerIcon}
      </Center>
      <Center className="local-server-state" color={$cfg.frontcolor}>
        {LocalServerIcon}
      </Center>
      <Box flexGrow="1" className="flex"></Box>
      <Box className="page-identicator" color={$cfg.frontcolor}>
        <ToggleButton state={$dm.page} displays={[MessageIcon, GiftIcon, ViewedIcon]} gap={$utils.unit(6)} />
      </Box>
      <Center className="remove-page" color={$cfg.frontcolor} cursor="pointer" onClick={(e) => setPage(-1)}>
        {RemoveIcon}
      </Center>
      <Center className="settings-button" color={$cfg.frontcolor}>
        {SettingsIcon}
      </Center>
    </HStack>
  );
}
