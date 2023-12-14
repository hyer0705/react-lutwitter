import { useRecoilState } from "recoil";
import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";
import PostTweetForm from "./post-tweet-form";
import { isOpenPostTweetDialog } from "../../recoil/tweetAtom";
import {
  DialogCloseBtn,
  DialogContent,
  DialogOverloay,
} from "./tweet-components";

const PostBtn = styled.button`
  cursor: pointer;
  width: 100%;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #000;
  color: #fff;
  font-weight: 600;
  &:hover {
    background-color: #222;
  }
`;

export default function PostTweetDialog() {
  const [isOpenDialog, setIsOpenDialog] = useRecoilState(isOpenPostTweetDialog);

  return (
    <Dialog.Root open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <Dialog.Trigger asChild>
        <PostBtn>POST</PostBtn>
      </Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverloay />
        <DialogContent>
          <PostTweetForm labelId="tweet-dialog-img" />
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
      </Dialog.Portal>
    </Dialog.Root>
  );
}
