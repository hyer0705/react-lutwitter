import { atom } from "recoil";

export interface IShowEditForm {
  tweetId: string;
  showEdit: boolean;
}

export const isOpenPostTweetDialog = atom({
  key: "isOpenPostTweetDialog",
  default: false,
});

export const isOepnEditTweetDialog = atom({
  key: "isOpenEditTweetDialog",
  default: { tweetId: "", isOpen: false },
});

export const selectedTweetIdState = atom({
  key: "selectedTweetIdState",
  default: "",
});
