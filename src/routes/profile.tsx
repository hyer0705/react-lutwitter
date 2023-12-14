import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { maxFileSize } from "../libs/form-validate";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { ITweet } from "../components/tweets/timeline";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import Tweet from "../components/tweets/tweet";
import { isAuthEditState } from "../atom/authAtom";

const Wrapper = styled.div`
  height: 100%;
`;

const ProfileBackground = styled.div`
  background-color: rgb(227, 243, 172, 0.5);
  width: 100%;
  height: 7rem;
`;
const ProfileMain = styled.div`
  padding: 0 1rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const ProfileAvatarWrapper = styled.div`
  margin-top: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const ProfileAvatar = styled.div`
  position: absolute;
  top: -35px;
  width: 70px;
  height: 70px;
  border: none;
  border-radius: 50%;
  background-color: #e3f3ac;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ProfileAvatarImg = styled.img`
  width: 90%;
  height: 90%;
  object-fit: cover;
  overflow: hidden;
  border-radius: 50%;
`;
const ProfileAvatarSvg = styled.svg`
  width: 75%;
  height: 75%;
`;
const ProfileUserInfo = styled.span`
  &:nth-child(2) {
    font-weight: 700;
  }
  &:last-child {
    font-size: 12px;
  }
`;

const ProfileEditBtn = styled.button`
  padding: 0.2rem 0.8rem;
  border: 1px solid #fff;
  border-radius: 1rem;
  background-color: inherit;
  cursor: pointer;
  color: #fff;
`;

const ProfileEditForm = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ProfileAvatarLabel = styled.label`
  position: absolute;
  top: 5px;
  left: 60px;
  background-color: #aaad9b;
  border-radius: 50%;
  padding: 0.3rem;
  cursor: pointer;
  svg {
    width: 25px;
    height: 25px;
  }
`;
const ProfileAvatarInput = styled.input`
  display: none;
`;

const ProfileLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;
const ProfileUserInfoInput = styled.input`
  border-radius: 1rem;
  border: none;
  padding: 0.3rem 0.8rem;
`;

const EditErrMsg = styled.span`
  padding: 0.5rem 0;
  font-size: 12px;
  font-weight: 600;
  color: #c9182b;
`;

const Tweets = styled.div`
  margin-top: 1rem;
  padding-right: 1rem;
  height: 74%;
  display: grid;
  gap: 1rem;
  overflow-y: scroll;
  grid-template-rows: 1fr 5fr;
`;

interface IEditProfileForm {
  avatar?: FileList;
  displayName: string;
}

export default function Profile() {
  const user = auth.currentUser;

  const setIsAuthEdit = useSetRecoilState(isAuthEditState);
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [tweets, setTweets] = useState<ITweet[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditProfileForm>({
    defaultValues: { displayName: user?.displayName || "익명" },
  });

  const onEditProfileClick = () => setIsEditProfile(true);

  const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;
    if (files && files?.length > 0) {
      const avatarImg = files[0];
      const avatarImgUrl = URL.createObjectURL(avatarImg);

      setAvatar(avatarImgUrl);
    }
  };

  const updateTweets = async ({
    displayName,
    avatar,
  }: {
    displayName?: string;
    avatar?: string;
  }) => {
    const tweetsQuery = query(
      collection(db, "tweets"),
      where("creatorId", "==", user?.uid)
    );
    const querySnapshot = await getDocs(tweetsQuery);

    // 한 번에 update 하는 방법은? forEach를 사용하지 않는 방법은?
    querySnapshot.forEach(async (doc) => {
      if (displayName) {
        await updateDoc(doc.ref, {
          creatorName: displayName,
        });
      }
      if (avatar) {
        await updateDoc(doc.ref, {
          creatorAvatar: avatar,
        });
      }
    });
  };
  const onValid = async (validData: IEditProfileForm) => {
    const { displayName, avatar } = validData;
    try {
      if (!user) return;

      setIsAuthEdit(true);

      if (avatar && avatar.length > 0) {
        const file = avatar[0];
        const locationRef = ref(storage, `avatars/${user.uid}`);
        const result = await uploadBytes(locationRef, file);
        const avatarUrl = await getDownloadURL(result.ref);

        setAvatar(avatarUrl);
        await updateProfile(user, {
          photoURL: avatarUrl,
        });

        await updateTweets({ avatar: avatarUrl });
      }

      if (displayName !== user?.displayName) {
        await updateProfile(user, {
          displayName,
        });

        await updateTweets({ displayName });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsEditProfile(false);
      fetchTweets();
      setIsAuthEdit(false);
    }
  };

  const fetchTweets = async () => {
    const tweetQuery = query(
      collection(db, "tweets"),
      where("creatorId", "==", user?.uid),
      orderBy("createdAt", "desc"),
      limit(25)
    );

    const snapshot = await getDocs(tweetQuery);
    const tweets = snapshot.docs.map((doc) => {
      const { tweet, createdAt, creatorId, creatorName, creatorAvatar, photo } =
        doc.data();

      return {
        tweet,
        createdAt,
        creatorId,
        creatorName,
        creatorAvatar,
        photo,
        id: doc.id,
      };
    });

    setTweets(tweets);
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <Wrapper>
      <ProfileBackground></ProfileBackground>
      <ProfileMain>
        {isEditProfile ? (
          <ProfileEditForm
            onSubmit={handleSubmit(onValid, (e) => console.log(e))}
          >
            <ProfileAvatarWrapper>
              <ProfileAvatar>
                {avatar ? (
                  <ProfileAvatarImg src={avatar} alt="avatar image" />
                ) : (
                  <ProfileAvatarSvg
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
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </ProfileAvatarSvg>
                )}
              </ProfileAvatar>
              <ProfileAvatarLabel htmlFor="avatar">
                <svg
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
                    d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                  />
                </svg>
              </ProfileAvatarLabel>
              <ProfileAvatarInput
                type="file"
                id="avatar"
                accept="image/*"
                {...register("avatar", {
                  onChange: onAvatarChange,
                  validate: {
                    maxFileSize,
                  },
                })}
              />
              {errors.avatar?.message ? (
                <EditErrMsg>{errors.avatar.message}</EditErrMsg>
              ) : null}
              <ProfileLabel>
                Display Name:
                <ProfileUserInfoInput
                  type="text"
                  placeholder="Ex) Lucy"
                  {...register("displayName", {
                    required: {
                      value: true,
                      message: "사용자의 display 이름을 입력해주세요",
                    },
                  })}
                />
              </ProfileLabel>
              {errors.displayName?.message ? (
                <EditErrMsg>{errors.displayName.message}</EditErrMsg>
              ) : null}
            </ProfileAvatarWrapper>
            <ProfileEditBtn>완료</ProfileEditBtn>
          </ProfileEditForm>
        ) : (
          <>
            <ProfileAvatarWrapper>
              <ProfileAvatar>
                {avatar ? (
                  <ProfileAvatarImg src={avatar} alt="avatar image" />
                ) : (
                  <ProfileAvatarSvg
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
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </ProfileAvatarSvg>
                )}
              </ProfileAvatar>
              <ProfileUserInfo>{user?.displayName || "익명"}</ProfileUserInfo>
              <ProfileUserInfo>{`@${user?.uid.slice(0, 10)}`}</ProfileUserInfo>
            </ProfileAvatarWrapper>
            <ProfileEditBtn onClick={onEditProfileClick}>
              Edit Profile
            </ProfileEditBtn>
          </>
        )}
      </ProfileMain>
      <Tweets>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </Tweets>
    </Wrapper>
  );
}
