import { useRecoilState } from "recoil";
import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";
import PostTweetForm from "./post-tweet-form";
import { isOpenPostTweetDialog } from "../../atom/tweetAtom";

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

const Overlay = styled(Dialog.Overlay)`
  background-color: rgba(227, 243, 172, 0.9);
  position: fixed;
  inset: 0;
`;

const DialogContent = styled(Dialog.Content)`
  background-color: #44c662;
  border-radius: 0.5rem;
  position: fixed;
  top: 35%;
  left: 40%;
  width: 90vw;
  max-width: 360px;
  max-height: 85vh;
`;

const DialogCloseBtn = styled.svg`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 7px;
  right: 7px;
`;

export default function PostTweetDialog() {
  const [isOpenDialog, setIsOpenDialog] = useRecoilState(isOpenPostTweetDialog);

  return (
    <Dialog.Root open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <Dialog.Trigger asChild>
        <PostBtn>POST</PostBtn>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Overlay />
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
