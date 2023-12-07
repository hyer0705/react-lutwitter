import { Outlet, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";

const Wrapper = styled.div`
  padding-right: 1rem;
  margin-right: 1rem;
  width: 240px;
  height: 100%;
  position: relative;
  border-right: 1px solid #fff;
`;

const LogoTtile = styled.h3`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 5rem;
`;

const Menu = styled.ul`
  margin-bottom: 21px;
`;
const MenuItem = styled.li`
  width: 100%;
  &:not(:last-child) {
    margin-bottom: 21px;
  }
  span {
    font-size: 20px;
  }
  a {
    width: 100%;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #fff;
  }
`;
const Svg = styled.svg`
  height: 24px;
  margin-right: 8px;
`;

const Btn = styled.button`
  cursor: pointer;
  width: 100%;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #000;
  color: #fff;
  font-weight: 600;
`;

const UserWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserLeft = styled.div`
  display: flex;
  align-items: center;
`;

const UserProfile = styled.div`
  margin-right: 1rem;
  width: 24px;
  height: 24px;
  background-color: #eee2de;
  border-radius: 50%;
  cursor: pointer;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;

  span:first-child {
    font-weight: 600;
    padding-bottom: 0.3rem;
    font-size: 14px;
    cursor: pointer;
  }
  span:last-child {
    font-size: 12px;
  }
`;

const Logout = styled.div`
  span {
    font-size: 12px;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
  span:hover {
    font-weight: 700;
  }
`;

export default function Layout() {
  const navigate = useNavigate();
  const onLogout = async () => {
    try {
      await auth.signOut();

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Wrapper>
        <LogoTtile>Lutwitter</LogoTtile>
        <Menu>
          <MenuItem>
            <Link to="/">
              <Svg
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
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </Svg>
              <span>Home</span>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/explore">
              <Svg
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
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </Svg>
              <span>Explore</span>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/bookmark">
              <Svg
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
              </Svg>
              <span>Bookmark</span>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/profile">
              <Svg
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
              </Svg>
              <span>Profile</span>
            </Link>
          </MenuItem>
        </Menu>
        <Btn>POST</Btn>
        <UserWrapper>
          <UserLeft>
            <UserProfile />
            <UserInfo>
              {/** 강의 들어보고 어떻게 할지 아이디어 얻기 */}
              <span>Username</span>
              {/* <span>@userid</span> */}
            </UserInfo>
          </UserLeft>
          <Logout>
            <span onClick={onLogout}>logout</span>
          </Logout>
        </UserWrapper>
      </Wrapper>
      <Outlet />
    </>
  );
}
