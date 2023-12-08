import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const Wrapper = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 0.5rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;
const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  &:nth-child(2) {
    flex: 1;
    margin-left: 0.5rem;
  }
`;

const ProfilePic = styled.div`
  width: 28px;
  height: 28px;
  background-color: #eee2de;
  border-radius: 50%;
`;
const UserName = styled.span`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 0.3rem;
`;
const UserId = styled.span`
  font-size: 12px;
`;

const Content = styled.p``;
const Img = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 0.5rem;
`;

const TweetInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;
const Icon = styled.svg`
  width: 20px;
  height: 20px;
`;

const DeleteBtn = styled.svg`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const InfoData = styled.span``;

export default function Tweet({ username, userId, photo, tweet, id }: ITweet) {
  const user = auth.currentUser;
  const onDeleteBtnClick = async () => {
    const confirmDelete = confirm("정말 이 트윗을 지우시겠습니까?");

    if (!confirmDelete || user?.uid !== userId) return;
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
    <Wrapper>
      <Row>
        <Col>
          <ProfilePic />
        </Col>
        <Col>
          <UserName>{username}</UserName>
          <UserId>{`@${userId}`}</UserId>
        </Col>
        <Col>
          {user?.uid === userId ? (
            <DeleteBtn
              onClick={onDeleteBtnClick}
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
            </DeleteBtn>
          ) : null}
        </Col>
      </Row>
      <Row>
        <Col>
          <Content>{tweet}</Content>
          {photo ? <Img src={photo} /> : null}
        </Col>
      </Row>
      <Row>
        <TweetInfo>
          <Icon
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
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
            />
          </Icon>
          <InfoData>댓글</InfoData>
        </TweetInfo>
        <TweetInfo>
          <Icon
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
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </Icon>
          <InfoData>좋아요</InfoData>
        </TweetInfo>
        <TweetInfo>
          <Icon
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
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            />
          </Icon>
          <InfoData>북마크</InfoData>
        </TweetInfo>
        <TweetInfo>
          <Icon
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
              d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
            />
          </Icon>
          <InfoData>조회수</InfoData>
        </TweetInfo>
      </Row>
    </Wrapper>
  );
}
