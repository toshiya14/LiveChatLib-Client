import { HStack } from "@chakra-ui/react";
import { faComment, faGear, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { TestAvatar } from "../assets/test-avatar.base64";
import { ConfigContext } from "../context/config-context";
import { Danmaku, DanmakuComment, DanmakuContext } from "../context/danmaku-context";
import moment from "moment";
import "./debug-menu.scss";
import { ulid } from "ulid";

export function DebugMenu() {
  const [$cfg, set$cfg] = useContext(ConfigContext);
  const $dm = useContext(DanmakuContext);

  const senderCandidate = ["路人甲", "路人乙", "名字很长的路人丙", "名字特别特别长的路人丁先生"];

  const commentsCandidate = [
    "牛",
    "短评论",
    "相对比较长的评论",
    "这是一条特别特别长的评论弹幕",
    "这是一条长到没有边的长篇大论，但是看看内容，你会发现其实是完全没有什么实际意义的文字"
  ];

  const avatar = "data:img/jpg;base64," + TestAvatar;

  const position = {
    top: $cfg.popupDirection === "up" ? 0 : undefined,
    bottom: $cfg.popupDirection === "down" ? 0 : undefined
  };

  function debugShowComment() {
    let [list, setList] = $dm.list;
    let id = ulid();
    let item = {
      id: id,
      type: "comment",
      source: "bilibili",
      sender: senderCandidate[Math.floor(Math.random() * senderCandidate.length)],
      comments: commentsCandidate[Math.floor(Math.random() * commentsCandidate.length)],
      time: moment(),
      avatar: avatar,
      state: "in"
    };
    list.push(item as Danmaku);
    setList([...list]);

    console.debug("* debugShowComment", { comment: item });

    // set out after popup
    setTimeout(() => {
      // console.debug("* debugShowComment, set state to `out`.");
      let target = list.find((x) => x.id === id);
      if (target) {
        target.state = "gone";
      }
    }, $cfg.stayTiming + $cfg.fadeOutTiming);
  }

  function debugShowVariables() {
    console.debug("* debugShowVariables", { $cfg, $dm });
  }

  return (
    <HStack
      {...position}
      className="debug-panel"
      position="absolute"
      zIndex={99}
      bg="rgba(0,0,0,0.4)"
      borderRadius={4}>
      <FontAwesomeIcon
        icon={faComment}
        color="white"
        className="clickable-button"
        onClick={debugShowComment}
      />

      <FontAwesomeIcon
        icon={faUserGear}
        color="white"
        className="clickable-button"
        onClick={debugShowVariables}
      />
    </HStack>
  );
}
