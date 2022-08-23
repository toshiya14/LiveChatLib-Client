import { Box, Icon } from "@chakra-ui/react";
import React, { useContext } from "react";
import { CommentsPopup } from "../components/comments-popup";
import { DebugMenu } from "../components/debug-menu";
import { ConfigContext } from "../context/config-context";
import { DanmakuContext } from "../context/danmaku-context";
import { Header } from "./header";

export function MainPage() {
  const [$cfg, set$cfg] = useContext(ConfigContext);
  const $dm = useContext(DanmakuContext);

  const [page, setPage] = $dm.page;
  const [list, setList] = $dm.list;

  console.log("list", { list });

  return (
    <main
      className="doc-wrap"
      style={{
        flexDirection: $cfg.popupDirection === "up" ? "column-reverse" : "column"
      }}>
      <Header remoteServerState="lost" localServerState="ok"></Header>
      <Box className="view">
        {$cfg.debug && <DebugMenu />}
        {page === -1 && (
          <div
            className="popup"
            style={{
              flexDirection: $cfg.popupDirection === "up" ? "column-reverse" : "column"
            }}>
            {list.map((dm) => {
              if (dm.state === "gone") {
                return <React.Fragment key={dm.id}></React.Fragment>;
              }
              switch (dm.type) {
                case "comment":
                  return <CommentsPopup key={dm.id} item={dm} state={dm.state} />;

                default:
                  return <React.Fragment key={dm.id}></React.Fragment>;
              }
            })}
          </div>
        )}
      </Box>
    </main>
  );
}
