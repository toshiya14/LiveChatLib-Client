import React, { createContext } from "react";
import moment from "moment";
import { Dispatchable } from "../objects/dispatchable-object";

export type DanmakuBase = {
  id: string;
  type: "comment" | "gift" | "welcome";
  source: "bilibili";
  sender: string;
  time: moment.Moment;
  state: "in" | "highlight" | "stay" | "out" | "gone";
};

export type DanmakuComment = DanmakuBase & {
  avatar: string;
  type: "comment";
  comments: string;
};

export type DanmakuGift = DanmakuBase & {
  icon: string;
  type: "gift";
  giftName: string;
  giftCount: number;
};

export type DanmakuWelcome = DanmakuBase & {
  avatar: string;
  type: "welcome";
};

export type Danmaku = DanmakuComment | DanmakuGift | DanmakuWelcome;

export type DanmakuModel = {
  list: Dispatchable<Danmaku[]>;
  page: Dispatchable<number>;
};

export const DanmakuContext = createContext<DanmakuModel>({} as DanmakuModel);
