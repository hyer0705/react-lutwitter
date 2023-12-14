import { useEffect } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import * as Dialog from "@radix-ui/react-dialog";
import {
  DialogCloseBtn,
  DialogContent,
  DialogOverloay,
  TweetControlBtn,
} from "./tweet-components";
import EditTweetForm from "./edit-tweet-form";
import {
  isOepnEditTweetDialog,
  selectedTweetIdState,
} from "../../recoil/tweetAtom";

export default function EditTweetDialog({ id }: { id: string }) {
  const setSelectedTweetId = useSetRecoilState(selectedTweetIdState);
  const [isOpenDialog, setIsOpenDialog] = useRecoilState(isOepnEditTweetDialog);

  const onEditBtnClick = () => {
    setSelectedTweetId(id);
    setIsOpenDialog((prev) => ({ ...prev, tweetId: id }));
  };

  useEffect(() => {
    return () => setSelectedTweetId("");
  }, []);

  return (
    <Dialog.Root
      open={isOpenDialog.tweetId === id && isOpenDialog.isOpen}
      onOpenChange={(open) => setIsOpenDialog({ tweetId: id, isOpen: open })}
    >
      <Dialog.Trigger asChild>
        <TweetControlBtn
          onClick={onEditBtnClick}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </TweetControlBtn>
      </Dialog.Trigger>
      <DialogOverloay />
      <DialogContent>
        <EditTweetForm />
        <Dialog.Close asChild>
          <DialogCloseBtn
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </DialogCloseBtn>
        </Dialog.Close>
      </DialogContent>
    </Dialog.Root>
  );
}
