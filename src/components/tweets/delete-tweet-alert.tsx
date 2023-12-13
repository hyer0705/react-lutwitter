import * as AlertDialog from "@radix-ui/react-alert-dialog";
import styled from "styled-components";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { TweetControlBtn } from "./tweet-components";
import { auth, db, storage } from "../../firebase";

const AlertDialogOverlay = styled(AlertDialog.Overlay)`
  background-color: rgba(214, 228, 229, 0.75);
  position: fixed;
  inset: 0;
`;

const AlertDialogContent = styled(AlertDialog.Content)`
  padding: 1rem 0.7rem;
  background: rgba(68, 198, 98, 1);
  border-radius: 0.5rem;
  position: fixed;
  top: 35%;
  left: 40%;
  width: 90vw;
  max-width: 360px;
  max-height: 85vh;
`;

const AlertDialogTitle = styled(AlertDialog.Title)`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`;

const AlertDialogDesc = styled(AlertDialog.Description)`
  margin: 10px 0 20px 0;
  font-size: 14px;
`;

const AlertDialogBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const AlertDialogBtn = styled.button`
  width: 100%;
  border-radius: 1rem;
  border: none;
  padding: 0.5rem 1rem;
  font-weight: 600;
  color: #fff;

  &:first-child {
    background-color: #c9182b;
  }
  &:last-child {
    background-color: inherit;
    border: 1px solid #fff;
  }
`;

/**
 * To Do...
 * Timeline > Tweet > DeleteTweetAlert props 로 데이터를 주고 있는데 과연 이렇게 관리를 하는 것이 맞는 것인지?
 * 상태 관리 라이브러리를 사용해서 관리할 것인지?
 */
export default function DeleteTweetAlert({
  photo,
  id,
}: {
  photo?: string;
  id: string;
}) {
  const user = auth.currentUser;
  const onDelete = async () => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <TweetControlBtn
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
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </TweetControlBtn>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogTitle>게시물을 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDesc>이 작업은 취소할 수 없습니다.</AlertDialogDesc>
          <AlertDialogBtnWrapper>
            <AlertDialog.Action asChild>
              <AlertDialogBtn onClick={onDelete}>삭제</AlertDialogBtn>
            </AlertDialog.Action>
            <AlertDialog.Cancel asChild>
              <AlertDialogBtn>취소</AlertDialogBtn>
            </AlertDialog.Cancel>
          </AlertDialogBtnWrapper>
        </AlertDialogContent>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
