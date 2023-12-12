import styled from "styled-components";
import { auth } from "../firebase";
import { useState } from "react";

const Wrapper = styled.div`
  width: 360px;
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
const ProfileAvatarImg = styled.img``;
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
const ProfileUserInfoInput = styled.input`
  border-radius: 1rem;
  border: none;
  padding: 0.3rem 0.8rem;
`;

export default function Profile() {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [isEditProfile, setIsEditProfile] = useState(false);

  const onEditProfileClick = () => setIsEditProfile(true);

  return (
    <Wrapper>
      <ProfileBackground></ProfileBackground>
      <ProfileMain>
        {isEditProfile ? (
          <ProfileEditForm>
            <ProfileAvatarWrapper>
              <ProfileAvatar>
                {avatar ? (
                  <ProfileAvatarImg src="" alt="avatar image" />
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
              <ProfileAvatarInput type="file" id="avatar" />
              <ProfileUserInfoInput value={user?.displayName || "익명"} />
              <ProfileUserInfo>{`@${user?.uid.slice(0, 10)}`}</ProfileUserInfo>
            </ProfileAvatarWrapper>
            <ProfileEditBtn>완료</ProfileEditBtn>
          </ProfileEditForm>
        ) : (
          <>
            <ProfileAvatarWrapper>
              <ProfileAvatar>
                {avatar ? (
                  <ProfileAvatarImg src="" alt="avatar image" />
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
    </Wrapper>
  );
}
