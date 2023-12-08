import { atom } from "recoil";

export interface IShowEditForm {
  tweetId: string;
  showEdit: boolean;
}

export const showEditFormState = atom<IShowEditForm>({
  key: "showEditFormState",
  default: { tweetId: "", showEdit: false },
});
